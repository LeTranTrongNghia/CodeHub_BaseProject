import { isValidGender } from './../utils/helper.js';
import { checkSchema } from 'express-validator';
import validate from '../utils/validate.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import { StatusCodes } from 'http-status-codes';
import {
	containsNewline,
	findUserByEmail,
	isValidEmail,
	isValidMulName,
	isValidPassword,
	isValidUsername,
	validateAccountAccessibility,
	validateEmail,
} from '../utils/helper.js';
import { MESSAGES } from '../constants/message.js';
import otpService from '../services/otp.service.js';

import bcrypt from 'bcrypt';
import { databaseService } from '../services/database.service.js';

// Validation register feature
export const registerValidator = validate(
	checkSchema(
		{
			username: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.USERNAME_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.USERNAME_INCLUDES_MUL_WHITESPACE,
				},
				isLength: {
					options: {
						min: 3,
						max: 30,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.USERNAME_LENGTH_MUST_BE_FROM_3_TO_30,
				},
				trim: true,
				custom: {
					options: async value => {
						const checkEnter = containsNewline(value);
						const checkValidCharater = isValidUsername(value);
						const checkMulWhitespace = isValidMulName(value);
						if (checkEnter) {
							throw new Error(
								MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.INVALID_USERNAME,
							);
						}
						if (!checkValidCharater) {
							throw new Error(
								MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.INVALID_USERNAME,
							);
						}
						if (!checkMulWhitespace) {
							throw new Error(
								MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.USERNAME_INCLUDES_MUL_WHITESPACE,
							);
						}
						return true;
					},
				},
			},
			email: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.EMAIL_IS_REQUIRED,
				},
				trim: true,
				custom: {
					options: async value => {
						const { valid, message } = validateEmail(value);
						if (!valid) {
							throw new Error(message);
						}
						const user = await findUserByEmail(value);
						if (user) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.CONFLICT,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
										.EMAIL_ACCESSIBILITY,
							});
						}
						return true;
					},
				},
			},
			password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.PASSWORD_MUST_BE_A_STRING,
				},
				isStrongPassword: {
					options: {
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 1,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.MUST_BE_STRONG,
				},
				trim: true,
				escape: true,
				isLength: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
					options: {
						min: 8,
						max: 16,
					},
				},
				custom: {
					options: value => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD
										.CONTAINS_EMOJI,
							});
						}
						return true;
					},
				},
			},
			confirm_password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.CONFIRM_PASSWORD_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.CONFIRM_PASSWORD_MUST_BE_A_STRING,
				},
				escape: true,
				trim: true,
				custom: {
					options: (value, { req }) => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD
										.CONTAINS_EMOJI,
							});
						}

						if (value !== req.body.password) {
							throw new Error(
								MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD.MUST_BE_THE_SAME_AS_PASSWORD,
							);
						}
						return true;
					},
				},
				isLength: {
					options: {
						min: 8,
						max: 16,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD
							.LENGTH_MUST_BE_FROM_8_TO_16,
				},
			},
		},
		['body'],
	),
);
// Validation login feature
export const loginValidator = validate(
	checkSchema(
		{
			email: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_MUST_BE_A_STRING,
				},
				trim: true,
				custom: {
					options: async value => {
						const validEmail = isValidEmail(value);
						if (!validEmail) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_INVALID,
							});
						}
						await validateAccountAccessibility(value);
						return true;
					},
				},
			},
			password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.PASSWORD_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.PASSWORD_MUST_BE_A_STRING,
				},
				isStrongPassword: {
					options: {
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 1,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS
							.EMAIL_OR_PASSWORD_IS_INCORRECT,
				},
				trim: true,
				isLength: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN
							.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
					options: {
						min: 8,
						max: 16,
					},
				},
				custom: {
					options: async value => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.LOGIN
										.PASSWORD_CONTAINS_EMOJI,
							});
						}
						return true;
					},
				},
			},
		},
		['body'],
	),
);

export const verifyValidator = validate(
	checkSchema(
		{
			otp: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.VERIFY_OTP.IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.VERIFY_OTP.MUST_BE_A_STRING,
				},
				isLength: {
					options: {
						min: 6,
						max: 6,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.VERIFY_OTP.OPT_LENGTH_MUST_BE_6,
				},
				trim: true,
				custom: {
					options: async value => {
						const otp = await otpService.findOTP(value);
						if (!otp) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.NOT_FOUND,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.VERIFY_OTP
										.NOT_FOUND_OR_ALREADY_VERIFIED,
							});
						}
						const currentTime = new Date();
						if (otp.expiredIn < currentTime) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.VERIFY_OTP.IS_EXPIRED,
							});
						}
						return true;
					},
				},
			},
		},
		['body'],
	),
);

export const refreshTokenValidator = validate(
	checkSchema(
		{
			refresh_token: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN.IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN
							.MUST_BE_A_STRING,
				},
				trim: true,
			},
		},
		['body'],
	),
);

export const resendOTPValidator = validate(
	checkSchema(
		{
			email: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_MUST_BE_A_STRING,
				},
				trim: true,
				custom: {
					options: async value => {
						const validEmail = isValidEmail(value);
						if (!validEmail) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_INVALID,
							});
						}
						const existingEmail = await databaseService.users.findOne({
							email: value,
						});
						if (!existingEmail) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.NOT_FOUND,
								message: MESSAGES.ERROR_MESSAGES.USER_SPECIFIC.NOT_FOUND,
							});
						}
						return true;
					},
				},
			},
		},
		['body'],
	),
);

//change password
export const ChangePwdValidator = validate(
	checkSchema(
		{
			old_password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.OLD_PASSWORD.IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.PASSWORD_MUST_BE_A_STRING,
				},
				isStrongPassword: {
					options: {
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 1,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.MUST_BE_STRONG,
				},
				trim: true,
				isLength: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN
							.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
					options: {
						min: 8,
						max: 16,
					},
				},
				custom: {
					options: async (value, { req }) => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.LOGIN
										.PASSWORD_CONTAINS_EMOJI,
							});
						}
						const changePwdUser = await databaseService.users.findOne({
							email: req.user.email,
						});
						const isOldPwdMatch = await bcrypt.compare(
							value,
							changePwdUser.password,
						);
						if (!isOldPwdMatch) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.OLD_PASSWORD
										.IS_INCORRECT,
							});
						}
						return true;
					},
				},
			},
			new_password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NEW_PASSWORD.IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NEW_PASSWORD
							.MUST_BE_A_STRING,
				},
				isStrongPassword: {
					options: {
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 1,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NEW_PASSWORD
							.MUST_BE_STRONG,
				},
				trim: true,
				escape: true,
				isLength: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NEW_PASSWORD
							.LENGTH_MUST_BE_FROM_8_TO_16,
					options: {
						min: 8,
						max: 16,
					},
				},
				custom: {
					options: (value, { req }) => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD
										.CONTAINS_EMOJI,
							});
						}
						if (value === req.body.old_password) {
							throw new Error(
								MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NEW_PASSWORD.NOT_SAME_OLD_PASSWORD,
							);
						}
						return true;
					},
				},
			},
			confirm_new_password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.CONFIRM_PASSWORD_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.CONFIRM_PASSWORD_MUST_BE_A_STRING,
				},
				escape: true,
				trim: true,
				custom: {
					options: (value, { req }) => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD
										.CONTAINS_EMOJI,
							});
						}
						if (value !== req.body.new_password) {
							throw new Error(
								MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD.MUST_BE_THE_SAME_AS_PASSWORD,
							);
						}
						return true;
					},
				},
				isLength: {
					options: {
						min: 8,
						max: 16,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD
							.LENGTH_MUST_BE_FROM_8_TO_16,
				},
			},
		},
		['body'],
	),
);

//forgot password
export const forgotPwdValidator = validate(
	checkSchema(
		{
			email: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_MUST_BE_A_STRING,
				},
				trim: true,
				custom: {
					options: async value => {
						const validEmail = isValidEmail(value);
						if (!validEmail) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_INVALID,
							});
						}
						await validateAccountAccessibility(value);
						return true;
					},
				},
			},
		},
		['body'],
	),
);

//reset password
export const resetPwdValidator = validate(
	checkSchema(
		{
			email: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_MUST_BE_A_STRING,
				},
				trim: true,
				custom: {
					options: async value => {
						const validEmail = isValidEmail(value);
						if (!validEmail) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_INVALID,
							});
						}
						validateAccountAccessibility(value);
						return true;
					},
				},
			},
			new_password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.PASSWORD_MUST_BE_A_STRING,
				},
				isStrongPassword: {
					options: {
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 1,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.MUST_BE_STRONG,
				},
				trim: true,
				escape: true,
				isLength: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
					options: {
						min: 8,
						max: 16,
					},
				},
				custom: {
					options: value => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD
										.CONTAINS_EMOJI,
							});
						}
						return true;
					},
				},
			},
			confirm_new_password: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.CONFIRM_PASSWORD_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.CONFIRM_PASSWORD_MUST_BE_A_STRING,
				},
				escape: true,
				trim: true,
				custom: {
					options: (value, { req }) => {
						const validPasswordEmoji = isValidPassword(value);
						if (!validPasswordEmoji) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD
										.CONTAINS_EMOJI,
							});
						}
						if (value !== req.body.new_password) {
							throw new Error(
								MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD.MUST_BE_THE_SAME_AS_PASSWORD,
							);
						}
						return true;
					},
				},
				isLength: {
					options: {
						min: 8,
						max: 16,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.CONFIRM_PASSWORD
							.LENGTH_MUST_BE_FROM_8_TO_16,
				},
			},
		},
		['body'],
	),
);

//update profile
export const updateProfileValidator = validate(
	checkSchema(
		{
			username: {
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.USERNAME_IS_REQUIRED,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.USERNAME_INCLUDES_MUL_WHITESPACE,
				},
				isLength: {
					options: {
						min: 3,
						max: 30,
					},
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
							.USERNAME_LENGTH_MUST_BE_FROM_3_TO_30,
				},
				trim: true,
				custom: {
					options: async value => {
						const checkEnter = containsNewline(value);
						const checkValidCharater = isValidUsername(value);
						const checkMulWhitespace = isValidMulName(value);
						if (checkEnter || !checkValidCharater) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.INVALID_USERNAME,
							});
						}
						if (!checkMulWhitespace) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
										.USERNAME_INCLUDES_MUL_WHITESPACE,
							});
						}
						return true;
					},
				},
			},
			gender: {
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.GENDER_MUST_BE_STRING,
				},
				custom: {
					options: async value => {
						const isValid = isValidGender(value);
						if (value !== '' && !isValid) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.GENDER_IS_INVALID,
							});
						}
						return true;
					},
				},
			},
			address: {
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.ADDRESS_MUST_BE_STRING,
				},
				custom: {
					options: async value => {
						const checkMulWhitespace = isValidMulName(value);
						if (value !== '' && !checkMulWhitespace) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.REGISTER
										.USERNAME_INCLUDES_MUL_WHITESPACE,
							});
						}
						return true;
					},
				},
				// isLength: {
				//   options: {
				//     min: 10,
				//     max: 200
				//   },
				//   errorMessage: MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.ADDRESS_LENGTH_IS_INVALID
				// }
			},
		},
		['body'],
	),
);

export const uploadAvtValidator = validate(checkSchema({}, ['body']));
