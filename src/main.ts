import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

// Check environement configuration
import '@/config/env.validator';
import { config } from '@/config/config';

import { AppModule } from '@/app.module';
import { corsOptionsDelegate } from '@/cors';

//! Proxy settings, production only
// <NestExpressApplication>
// app.set('trust proxy', 1);

async function bootstrap() {
	const PORT = config.app.port;
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
		rawBody: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			disableErrorMessages: false,
			whitelist: true,
			enableDebugMessages: true,
		}),
	);

	app.use(cookieParser());
	app.enableCors(corsOptionsDelegate);
	await app.listen(PORT);

	return app.getUrl();
}

(async (): Promise<void> => {
	try {
		const url = await bootstrap();
		NestLogger.debug(`Nest application running at : ${url}`, 'Bootstrap');
	} catch (error) {
		NestLogger.error(error, 'Bootstrap');
	}
})();
