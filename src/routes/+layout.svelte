<script lang="ts">
	import '../app.scss';
	import '../app.postcss';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '@fontsource-variable/anuphan';
	import { page } from '$app/stores';
	import ToastWrapper from '$lib/components/ToastWrapper.svelte';
	import Icon from '@iconify/svelte';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	// <!-- http://localhost:3000/
	// #access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg3OTc5NzU1LCJpYXQiOjE2ODc5NzYxNTUsInN1YiI6ImFhNjE2NmFhLWE4Y2MtNDc0Ny1hMmI1LTc4OTc5OTA2MDBlYSIsImVtYWlsIjoibWFucGF0c2Fnb3JueStzdGFmZkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7Imludml0ZWRfYnkiOiJtYW5wYXRzYWdvcm55QGdtYWlsLmNvbSIsInJvbGUiOiJzdGFmZiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTY4Nzk3NjE1NX1dLCJzZXNzaW9uX2lkIjoiNTZmZjkyNjUtMjFhNy00MzRiLWE2MDMtMzIwNjYxNmNlYTFiIn0.p_jPoD0TfyTIY-Yra5Az7xn-YFQKmyegn7nGqkTrJ3o
	// &expires_in=3600
	// &refresh_token=uIAHeXoC_Ras21VZUAhJvA
	// &token_type=bearer
	// &type=invite -->

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{@html `<!--
${'                       _oo0oo_'}
${'                      o8888888o'}
${'                      88" . "88'}
${'                      (| -_- |)'}
${'                      0\\  =  /0'}
${"                    ___/`---'\\___"}
${"                  .' \\\\|     |// '."}
${'                 / \\\\|||  :  |||// \\'}
${'                / _||||| -:- |||||- \\'}
${'               |   | \\\\\\  -  /// |   |'}
${"               | \\_|  ''\\---/''  |_/ |"}
${"               \\  .-\\__  '-'  ___/-. /"}
${"             ___'. .'  /--.--\\  `. .'___"}
${'          ."" \'<  `.___\\_<|>_/___.\' >\' "".'}
${'         | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |'}
${'         \\  \\ `_.   \\_ __\\ /__ _/   .-` /  /'}
${"     =====`-.____`.___ \\_____/___.-`___.-'====="}
${"                       `=---='"}
นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ
	นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ
		นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ

ขอให้ผลบุญที่ข้าพเจ้าได้สั่งสมดลให้เว็บแอปนี้ไม่มีบั๊กด้วยเถิด
	ขออย่าให้ข้าพเจ้าต้องตื่นมาแก้ตอนตีสองตีสาม
		ขอให้การทำงานผ่านไปอย่างราบรื่นทุกประการ
			สาธุ สาธุ สาธุ

คณะผู้จัดทำ
นักเรียนโรงเรียนวิทยาศาสตร๋ลุ่มแม่น้ำมูล
-->`}
<svelte:head>
	<meta name="theme-color" content="#374250" />
	<meta name="msapplication-navbutton-color" content="#374250" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="#374250" />
</svelte:head>
<ToastWrapper />
<slot />
