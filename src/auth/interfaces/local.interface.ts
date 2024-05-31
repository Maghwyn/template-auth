import { ObjectId } from 'mongodb';

import { Roles } from '@/auth/interfaces/roles.enum';

export interface LocalPayload {
	id: ObjectId;
	role: Roles;
}
