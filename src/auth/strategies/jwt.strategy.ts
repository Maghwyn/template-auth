import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger as NestLogger } from '@nestjs/common';

import { config } from '@/config/config';
import { JwtTokenData, JwtPayload } from '@/auth/interfaces/jwt.interface';
import { convertToObjectId } from '@/common/helpers/string.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			ignoreExpiration: false,
			secretOrKey: config.jwt.secret,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					try {
						const data = <string>req?.cookies['token'];
						if (!data) return null;

						const parsed = <JwtTokenData>JSON.parse(data);
						return parsed.token;
					} catch (err) {
						NestLogger.error(err.message);
						return null;
					}
				},
			]),
		});
	}

	async validate(payload: JwtPayload) {
		//! Should never happen, but just in case
		if (!payload?.id) {
			NestLogger.fatal("Fatal security error, the jwt was decoded by is missing the id");
			throw new UnauthorizedException();
		}

		payload.id = convertToObjectId(payload.id as string);
		return payload;
	}
}
