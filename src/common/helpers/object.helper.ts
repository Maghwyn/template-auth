/**
 * JSON parse(stringify) like, but doesn't affect date.
 * @param argv = { a: 1, b: undefined }
 * @returns = { a: 1 }
 */
export const clearUndefined = <T>(argv: T): T => {
	return Object.fromEntries(
		Object.entries(argv).filter(
			([, value]: [string, T]) => value !== undefined && value !== '',
		),
	) as T;
};
