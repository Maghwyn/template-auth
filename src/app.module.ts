import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';
import { MailjetModule } from '@/mailjet/mailjet.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { CronService } from '@/cron/cron.service';

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		DatabaseModule.forRoot(),
		ScheduleModule.forRoot(),
		MailjetModule,
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService, CronService],
})
export class AppModule {}
