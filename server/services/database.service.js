import { MongoClient, ServerApiVersion } from 'mongodb';
import { MESSAGES } from '../constants/message.js';

class DatabaseServices {
	client;
	db;
	constructor() {
		this.client = new MongoClient(process.env.ATLAS_URI, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});
		this.db = this.client.db('auth-user');
		this.progress = this.db.collection('progress');
	}
	async connect() {
		try {
			await this.db.command({ ping: 1 });
			console.log(MESSAGES.DATABASE.CONNECT_SUCCESS);
		} catch (error) {
			console.log(`⛔️ Unable to Connect MongoDB: ${error}`);
		}
	}
	async disConnect() {
		try {
			await this.client.close();
		} catch (error) {
			console.log(`⛔️ Unable to Connect MongoDB: ${error}`);
		}
	}

	get users() {
		return this.db.collection('users');
	}

	get refreshTokens() {
		return this.db.collection('refreshToken');
	}

	get otps() {
		return this.db.collection('otps');
	}
}

export const databaseService = new DatabaseServices();
