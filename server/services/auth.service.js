import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { MESSAGES } from '../constants/message.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import { databaseService } from './database.service.js';

class AuthService {
	async validateWithIDAccountAccessibility(id) {
		const user = await databaseService.users.findOne({ _id: new ObjectId(id) });
		if (!user || ['Unverified', 'Banned'].includes(user.verify)) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.FORBIDDEN,
				message: user
					? user.verify === 'Unverified'
						? MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_UNVERIFIED
						: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_BANNED
					: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_NOT_FOUND,
			});
		}
		return true;
	}
}
const authServices = new AuthService();
export default authServices;
