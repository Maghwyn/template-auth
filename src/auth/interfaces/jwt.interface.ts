import { ObjectId } from 'mongodb';

import { Roles } from '@/auth/interfaces/roles.enum';

export interface JwtTokenData {
	token: string;
}

export interface JwtPayload {
	id: string | ObjectId;
	role: Roles;
	iat: number;
	exp: number;
	refresh?: string;
}
