import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { isPropertyExist } from '$lib/utils';

const userWelcomeMetadataSchema = z
	.object({
		title_th: z.string(),
		title_en: z.string(),
		firstname_th: z.string(),
		firstname_en: z.string(),
		lastname_th: z.string(),
		lastname_en: z.string(),
		phone: z.string().regex(/^(0|\+66)[2-9]{1}[0-9]{7,8}$/, {
			message: 'โปรดกรอกเฉพาะตัวเลข ไม่ต้องมีเครื่องหมายขีดหรือช่องว่าง'
		}),
		password: z
			.string()
			.min(8, {
				message: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร'
			})
			.max(32, {
				message: 'รหัสผ่านต้องไม่ยาวกว่า 32 ตัวอักษร'
			}),
		retype_password: z
			.string()
			.min(8, {
				message: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร'
			})
			.max(32, {
				message: 'รหัสผ่านต้องไม่ยาวกว่า 32 ตัวอักษร'
			})
	})
	.superRefine(({ password, retype_password }, ctx) => {
		if (password !== retype_password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'รหัสผ่านไม่ตรงกัน',
				path: ['retype_password']
			});
		}
	});

export const load = (async ({ locals: { role, getSession, supabase } }) => {
	const session = await getSession();
	if (!session) throw error(401, 'Unauthorized');
	supabase.auth.refreshSession();
	await supabase.auth.refreshSession();
	const form = await superValidate(session.user.user_metadata, userWelcomeMetadataSchema);
	return {
		form,
		isUserSetupDoneAlready: isPropertyExist(session.user.user_metadata, [
			'title_th',
			'title_en',
			'firstname_th',
			'firstname_en',
			'lastname_th',
			'lastname_en',
			'phone'
		])
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals: { getSession, supabase }, request }) => {
		// check session
		const session = await getSession();
		if (!session) throw error(401, 'Unauthorized');
		const form = await superValidate(request, userWelcomeMetadataSchema);
		if (!form.valid) return fail(400, { form });
		const result = await supabase.auth.updateUser({
			data: {
				...session.user.user_metadata,
				title_th: form.data.title_th,
				title_en: form.data.title_en,
				firstname_th: form.data.firstname_th,
				firstname_en: form.data.firstname_en,
				lastname_th: form.data.lastname_th,
				lastname_en: form.data.lastname_en,
				phone: form.data.phone
			},
			password: form.data.password
		});
		if (result.error) return fail(500, { form, error: result.error });
		return { form, ok: true };
	}
} satisfies Actions;
