import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';


@Injectable()
export class CronService {
	
	constructor(
		// Inject stuff here if necessary
	) {}

	@Cron(CronExpression.EVERY_12_HOURS)
	async handleServerExpiration() {
		// Your code logic...
	}
}
