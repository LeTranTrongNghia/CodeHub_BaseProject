import pkg from 'jsonwebtoken';
const { JsonWebTokenError } = pkg;
import _ from 'lodash';
import { signToken, verifyToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import { databaseService } from './database.service.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../constants/message.js';
import otpService from './otp.service.js';
import { generateEmailContent } from '../utils/email.js';
import emailService from './email.service.js';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import dotenv from 'dotenv';
import User from '../models/schemas/User.schema.js';
import moment from 'moment';
dotenv.config();
class UserService {
	// Generate accesstoken
	signAccessToken(_id, email, username, role) {
		const secret_key = process.env.JWT_ACCESS_TOKEN_SECRET;
		const access_token_exp = process.env.ACCESS_TOKEN_EXPIRESIN;

		const jwt_algorithm = process.env.JWT_ALGORITHM;

		const payload = {
			_id,
			email,
			username,
			role,
			token_type: 'AccessToken',
		};
		const options = {
			expiresIn: access_token_exp,
			algorithm: jwt_algorithm,
		};
		return signToken({ payload, privateKey: secret_key, options });
	}

	// Generate freshtoken
	signRefreshToken(_id, email, username, role) {
		const refresh_token_key = process.env.JWT_REFRESH_TOKEN_SECRET;
		const jwt_algorithm = process.env.JWT_ALGORITHM;
		const refresh_token_exp = process.env.REFRESH_TOKEN_EXPIRESIN;
		return signToken({
			payload: {
				_id,
				email,
				username,
				role,
				token_type: 'RefreshToken',
			},
			privateKey: refresh_token_key,
			options: {
				expiresIn: refresh_token_exp,
				algorithm: jwt_algorithm,
			},
		});
	}

	// Generate refreshtoken and accesstoken
	signAccessAndRefreshToken(user_id, email, username, role) {
		return Promise.all([
			this.signAccessToken(user_id, email, username, role),
			this.signRefreshToken(user_id, email, username, role),
		]);
	}

	//create new account
	async register(user) {
		const { username, email, password } = user;
		try {
			const existingUser = await db.collection('users').findOne({ email });
			// if (existingUser) {
			// 	throw new ErrorWithStatus({
			// 		statusCode: StatusCodes.CONFLICT,
			// 		message: MESSAGES.ERROR_MESSAGES.GENERAL.EXISTED,
			// 	});
			// }
			const hashPwd = bcrypt.hashSync(password, 10);
			const user = new User({
				username,
				email,
				password: hashPwd,
			});

			const newUser = await db.collection('users').insertOne(user);
			const userId = newUser.insertedId.toString();
			const [access_token, refresh_token] =
				await this.signAccessAndRefreshToken(userId, email, username, 'User');

			await this.sendOTP(email);

			return {
				_id: userId,
				username,
				email,
				access_token,
				refresh_token,
			};
		} catch (error) {
			if (error instanceof ErrorWithStatus) {
				throw error;
			}
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.REGISTER,
			});
		}
	}

	//send OTP
	async sendOTP(email) {
		try {
			const otp = await otpService.generateOTP(email);
			const emailContent = await generateEmailContent(otp.code);
			await emailService.sendMail(otp.email, 'Code Hub', emailContent);
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.SEND_FAILURE,
			});
		}
	}

	async sendOTPForgotPwd(email) {
		try {
			const otp = await otpService.generateOTP(email);
			const emailContent = await generateEmailContentPwd(otp.code);
			await emailService.sendMail(otp.email, 'Code Hub', emailContent);
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.SEND_FAILURE,
			});
		}
	}

	//verify account
	async verifyAccount(otpObject) {
		try {
			const existingOTP = await otpService.findOTP(otpObject.otp);
			const { email } = existingOTP;
			await db
				.collection('users')
				.findOneAndUpdate({ email }, { $set: { verify: 'Verified' } });
			await db.collection('otps').findOneAndDelete({ email });
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.VERIFY_OTP,
			});
		}
	}

	//login to an existing account
	async login(payload) {
		try {
			const { email, password } = payload;
			const user = await db.collection('users').findOne({ email });
			if (!user) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.NOT_REGISTER,
				});
			}
			if (user.verify === 'Unverify') {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.FORBIDDEN,
					message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NOT_VERIFIED,
				});
			}
			const isPasswordMatch = await bcrypt.compare(password, user.password);
			if (!isPasswordMatch) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.UNAUTHORIZED,
					message:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS
							.EMAIL_OR_PASSWORD_IS_INCORRECT,
				});
			}
			const [access_token, refresh_token] =
				await this.signAccessAndRefreshToken(
					user._id.toString(),
					user.email,
					user.username,
					user.role,
				);
			const query = { user_id: user._id };
			const update = { $set: { token: refresh_token } };
			const options = { upsert: true };
			await db.collection('refreshTokens').updateOne(query, update, options);
			return {
				_id: user._id.toString(),
				username: user.username,
				email,
				access_token,
				refresh_token,
			};
		} catch (error) {
			if (error instanceof ErrorWithStatus) {
				throw error;
			}
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.LOGIN,
			});
		}
	}

	async refreshtoken(payload) {
		try {
			const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
			const data = await verifyToken({
				token: payload.refresh_token,
				secretOrPublicKey: secretKey,
			});
			const { _id, email, username, role } = data;
			const [access_token, refresh_token] =
				await this.signAccessAndRefreshToken(_id, email, username, role);
			return {
				access_token,
				refresh_token,
			};
		} catch (error) {
			if (error instanceof JsonWebTokenError) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message:
						MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN.IS_NOT_EXIST,
				});
			}
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message:
					MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN.NOT_FOUND,
			});
		}
	}

	async logout(payload) {
		try {
			const { refresh_token } = payload;
			const token = await db.collection('refreshTokens').findOne({
				token: refresh_token,
			});
			if (!token) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message:
						MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN.NOT_FOUND,
				});
			}
			await db.collection('refreshTokens').deleteOne(token);
		} catch (error) {
			if (error instanceof ErrorWithStatus && error.statusCode) {
				throw error;
			}
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.LOGOUT,
			});
		}
	}

	async changePassword(payload) {
		try {
			const { email, new_password } = payload;
			const hashNewPwd = bcrypt.hashSync(new_password, env.password.salt_round);
			const changePwdUser = await db.collection('users').findOne({ email });
			const query = { _id: changePwdUser._id };
			const update = { $set: { password: hashNewPwd } };
			const options = { upsert: false };
			await db.collection('users').updateOne(query, update, options);
		} catch (error) {
			if (error instanceof ErrorWithStatus) {
				throw error;
			}
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message:
					MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.CHANGE_FAILED,
			});
		}
	}

	async forgotPassword(email) {
		try {
			await this.sendOTPForgotPwd(email);
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.FORGOT_PASSWORD,
			});
		}
	}

	async verifyOTPForgotPwd(otp) {
		try {
			const existingOTP = await otpService.findOTP(otp);
			const { email } = existingOTP;
			await databaseService.otps.findOneAndDelete({ email });
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.VERIFY_FORGOT_PASSWORD_TOKEN,
			});
		}
	}

	async resetPwd(payload) {
		try {
			const hashedPwd = bcrypt.hashSync(new_password, env.password.salt_round);
			const updatedUser = await db.collection('users').findOne({ email });
			if (!updatedUser) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.RESET_FAILED,
				});
			}
			const query = { _id: updatedUser._id };
			const update = { $set: { password: hashedPwd } };
			const options = { upsert: false };
			await db.collection('users').updateOne(query, update, options);
			await databaseService.otps.deleteMany({ email });
		} catch (error) {
			if (error instanceof ErrorWithStatus) {
				throw error;
			}
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message:
					MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.RESET_FAILED,
			});
		}
	}

	async getProfile(id) {
		try {
			const user = await db.collection('users').findOne({
				_id: new ObjectId(id),
			});
			const filterUser = _.omit(user, 'password', 'password_change_at');
			return filterUser;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.GET_USER_PROFILE,
			});
		}
	}

	async updateProfile(id, payload) {
		try {
			if (Object.keys(payload).length === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message:
						MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.FIELD_UPDATE_IS_REQUIRED,
				});
			}
			const { username, gender, address } = payload;
			const update = {
				username,
				gender,
				address,
				updated_at: new Date(),
			};

			await db
				.collection('users')
				.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: update },
					{ upsert: false },
				);

			const user = await db.collection('users').findOne({
				_id: new ObjectId(id),
			});

			const filterUser = _.omit(user, 'password', 'password_change_at');
			return filterUser;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.UPDATE_USER,
			});
		}
	}

	async checkToken(payload) {
		try {
			// Lấy các trường từ payload
			const { iat, exp, ...otherProperties } = payload;

			// Kiểm tra xem token có thông tin thời gian không
			if (!iat || !exp) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.UNAUTHORIZED,
					message: MESSAGES.VALIDATION_MESSAGES.TOKEN.INVALID,
				});
			}

			// Lấy thời gian hiện tại
			const currentTime = moment().unix();

			// Kiểm tra token đã hết hạn chưa
			if (exp < currentTime) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.UNAUTHORIZED,
					message: MESSAGES.VALIDATION_MESSAGES.TOKEN.EXPIRED_TIME,
				});
			}

			// Trả về thông tin người dùng (bao gồm thời gian tạo và hết hạn đã được format)
			const userInfo = {
				...otherProperties,
				iat: moment(iat * 1000).format(),
				exp: moment(exp * 1000).format(),
			};

			return userInfo;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: error.message || 'Error in checking token',
			});
		}
	}
}

const userServices = new UserService();
export default userServices;
