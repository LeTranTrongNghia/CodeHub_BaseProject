import { checkSchema } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { MESSAGES } from '../constants/message.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import authServices from '../services/auth.service.js';
import { validateUserIdExist } from '../utils/helper.js';
import { verifyToken } from '../utils/jwt.js';
import validate from '../utils/validate.js';

export const authMiddleware = async (req, res, next) => {
	const bearer = req.get('Authorization');
	if (!bearer) {
		return next();
	}

	const tokens = bearer.split(' ');
	if (tokens.length !== 2) {
		throw new ErrorWithStatus({
			message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.INVALID_BEARER_TOKEN,
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	const access_token = tokens[1];
	try {
		const user = await verifyToken({
			token: access_token,
			secretOrPublicKey: 'Z8X7ERSQRTZMWM7OKVPYGH26LTSH7COV',
		});
		req.user = user;
		return next();
	} catch (error) {
		throw new ErrorWithStatus({
			statusCode: StatusCodes.UNAUTHORIZED,
			message: error.message,
		});
	}
};

export const requireLoginMiddleware = async (req, res, next) => {
	await authMiddleware(req, res, async () => {
		if (!req.user) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.UNAUTHORIZED,
				message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NOT_LOGIN,
			});
		}
		return next();
	});
};

export const requireRoleMiddleware = (...roles) => {
	return async (req, res, next) => {
		await requireLoginMiddleware(req, res, async () => {
			if (!roles.includes(req.user.role)) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.UNAUTHORIZED,
					message:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.NOT_ROLE_NOT_SATISFIED,
				});
			}
			return next();
		});
	};
};

export const checkUserIdValidator = validate(
	checkSchema(
		{
			id: {
				trim: true,
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.ID_CAN_NOT_BE_EMPTY,
				},
				isString: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.ID_MUST_BE_A_STRING,
				},
				custom: {
					options: async value => {
						if (!ObjectId.isValid(value)) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.BAD_REQUEST,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.ID_IS_INVALID,
							});
						}
						const user = await validateUserIdExist(value);
						if (!user) {
							throw new ErrorWithStatus({
								statusCode: StatusCodes.NOT_FOUND,
								message:
									MESSAGES.VALIDATION_MESSAGES.USER.COMMONS
										.WITH_ID_IS_NOT_EXIST,
							});
						}
						await authServices.validateWithIDAccountAccessibility(value);
						return true;
					},
				},
			},
		},
		['params'],
	),
);

export const checkUserRoleValidator = validate(
	checkSchema(
		{
			role: {
				trim: true,
				notEmpty: {
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.ROLE.USER_ROLE_CAN_NOT_BE_EMPTY,
				},
				isString: true,
				custom: {
					options: value =>
						['admin', 'user', 'moderator'].includes(value.toLowerCase()),
					errorMessage:
						MESSAGES.VALIDATION_MESSAGES.USER.ROLE.INVALID_USER_ROLE,
				},
			},
		},
		['body'],
	),
);
