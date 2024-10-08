import cookie from 'cookie';

export const createAuthCookie = (strategy: string) => {
	return cookie.serialize('token', strategy, {
		httpOnly: true,
		secure: true,
		maxAge: 60 * 60 * 24 * 30,
		sameSite: 'none',
		path: '/',
	});
};

export const expireAuthCookie = () => {
	return cookie.serialize('token', '', {
		httpOnly: true,
		secure: true,
		expires: new Date(0),
		sameSite: 'none',
		path: '/',
	});
};
