export interface EnvConfiguration {
	app: Configuration.Application;
	mongo: Configuration.MongoDB;
	jwt: Configuration.JWT;
	mailjet: Configuration.Mailjet;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Configuration {
	export interface Application {
		port: string;
		domain: string;
		isHttps: boolean;
		env: string;
		whitelist: Array<string>;
		redirect: string;
	}

	export interface MongoDB {
		uri: string;
		dbname: string;
	}

	export interface JWT {
		secret: string;
		cookie: JWTCookie;
	}

	export interface JWTCookie {
		secure: boolean;
		samesite: string;
	}

	export interface Mailjet {
		user: string;
		pass: string;
	}
}
