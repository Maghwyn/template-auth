import { config } from '@/config/config';
import { DynamicModule, Module } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

@Module({})
export class DatabaseModule {
	private static mongod: MongoMemoryServer;

	private static async _connectDatabase() {
		if (process.env.NODE_ENV === 'test') {
			DatabaseModule.mongod = await MongoMemoryServer.create();
			const uri = DatabaseModule.mongod.getUri();
			const client = await MongoClient.connect(uri);
			return client.db();
		} else {
			const client = await MongoClient.connect(config.mongo.uri, {
				//! Production settings
				// useUnifiedTopology: true,
				// useNewUrlParser: true,
				// tls: true,
			});
			return client.db(config.mongo.dbname);
		}
	}

	static async stopDatabase() {
		if (process.env.NODE_ENV === 'test') {
			if (DatabaseModule.mongod) {
				await DatabaseModule.mongod.stop({
					doCleanup: true,
				});
			}
		}
	}

	static forRoot(): DynamicModule {
		process.on('exit', () => {
			DatabaseModule.stopDatabase();
		});

		return {
			module: DatabaseModule,
			providers: [
				{
					provide: 'DATABASE_CONNECTION',
					useFactory: async () => await DatabaseModule._connectDatabase(),
				},
			],
			exports: ['DATABASE_CONNECTION'],
		};
	}
}
