import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { JwtPayload } from '@/auth/interfaces/jwt.interface';
import { Roles } from '@/auth/interfaces/roles.enum';

@Injectable()
export class RoleValidator implements CanActivate {
	constructor(private readonly requiredRole: Roles) {}

	canActivate(context: ExecutionContext): boolean {
		const user = context.switchToHttp().getRequest().user as JwtPayload;
		return user.role === this.requiredRole;
	}
}
