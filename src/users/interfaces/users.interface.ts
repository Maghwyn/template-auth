import { ObjectId } from 'mongodb';

import { Roles } from '@/auth/interfaces/roles.enum';

export interface User {
	_id?: ObjectId;
	email: string;
	username: string;
	firstname?: string;
	lastname?: string;
	password: string;
	activated: boolean;
	role: Roles;
	createdAt: Date | string;
}
