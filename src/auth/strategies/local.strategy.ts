import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email',
		});
	}

	async validate(email: string, password: string) {
		const { userId, role } = await this.authService.validateUser(email, password);
		if (userId === 1) throw new BadRequestException(); // Wrong Pwd/email
		if (userId === 2) throw new UnauthorizedException(); // Not activated

		return { id: userId, role };
	}
}
