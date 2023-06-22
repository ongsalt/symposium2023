export const sentencesMap = new Map([
	['fetch failed', 'ไม่สามารถเข้าถึงเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่ออินเตอร์เน็ต'],
	['Invalid login credentials', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง']
]);

export function toThai(message: string | undefined) {
	return sentencesMap.has(message ?? '') ? sentencesMap.get(message ?? '') : message;
}

/**
 * Format array of string into one localized string.
 * @param texts array of string to conjunction
 * @returns conjuncted localized string
 * @example ['แอปเปิ้ล', 'มะละกอ', 'กล้วย', 'ส้ม'] -> แอปเปิ้ล มะละกอ กล้วย และส้ม
 */
export function textListFormatter(texts: string[] | undefined) {
	if (typeof texts === 'undefined') return undefined;
	const formatter = new Intl.ListFormat('th-TH', {
		style: 'long',
		type: 'conjunction'
	});
	return formatter.format(texts);
}

/**
 * Format date into localized string.
 * @param date date to format
 * @param options Intl.DateTimeFormatOptions to format date
 * @returns localized date string
 * @example new Date() -> วันนี้
 * @example new Date('2021-01-01') -> 1 มกราคม 2021
 */
export function dateFormatter(date: Date | undefined, options?: Intl.DateTimeFormatOptions) {
	if (typeof date === 'undefined') return undefined;
	if (options) {
		return new Intl.DateTimeFormat('th-TH', options).format(date);
	}
	return new Intl.DateTimeFormat('th-TH', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

/**
 * Shorthand for dateFormatter. Format date into localized string.
 * @param date date to format. Must be in ISO 8601 format. {@link https://en.wikipedia.org/wiki/ISO_8601}
 * @param options Intl.DateTimeFormatOptions to format date
 * @returns
 */
export function d(date: string | undefined, options?: Intl.DateTimeFormatOptions) {
	return dateFormatter(new Date(date ?? ''), options);
}
