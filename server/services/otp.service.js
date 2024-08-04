import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../constants/message.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import OTP from '../models/schemas/Otp.schema.js';
import { databaseService } from './database.service.js';
import { generateOTPCode, hashOTP } from '../utils/crypto.js';
import db from '../db/connection.js';

class OTPService {
	async findOTP(otp) {
		try {
			const hashedOTP = hashOTP(otp);
			return await db.collection('otps').findOne({ otp: hashedOTP });
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
				message: error.message || MESSAGES.ERROR_MESSAGES.GENERAL.FIND_OTP,
			});
		}
	}

	async generateOTP(email) {
		try {
			const otpCode = generateOTPCode();
			let OTP_LIFETIME = 5 * 60 * 1000;
			const otp = new OTP({
				email,
				otp: hashOTP(otpCode),
				expiredIn: new Date(Date.now() + OTP_LIFETIME), // Expires in 5 minutes
			});

			await db.collection('otps').deleteMany({ email: email });
			await db.collection('otps').insertOne(otp);
			return { code: otpCode, email };
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
				message: error.message || MESSAGES.ERROR_MESSAGES.GENERAL.GENERATED_OTP,
			});
		}
	}
}

const otpService = new OTPService();

export default otpService;
