import express from 'express';
import userController from '../controllers/user.controller.js';
import { requireLoginMiddleware } from '../middlewares/auth.middleware.js';
import {
	ChangePwdValidator,
	forgotPwdValidator,
	loginValidator,
	refreshTokenValidator,
	registerValidator,
	resendOTPValidator,
	resetPwdValidator,
	updateProfileValidator,
	verifyValidator,
} from '../middlewares/user.middleware.js';
import { wrapRequestHandler } from '../utils/handler.js';
import db from '../db/connection.js';
import userServices from '../services/user.service.js';
import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
	try {
		const result = await userServices.login(req.body);
		return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.LOGIN);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.GENERAL.LOGIN,
		});
	}
});

userRouter.post('/register', async (req, res) => {
	try {
		const result = await userServices.register(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.REGISTER,
		);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.GENERAL.REGISTER,
		});
	}
});

userRouter.post(
	'/logout',
	wrapRequestHandler(requireLoginMiddleware),
	refreshTokenValidator,
	wrapRequestHandler(userController.logout),
);

userRouter.post(
	'/token/refresh',
	refreshTokenValidator,
	wrapRequestHandler(userController.refreshToken),
);

userRouter.post('/otp/authenticate', async (req, res) => {
	try {
		const result = await userServices.verifyAccount(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.OTP.VERIFY,
		);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.GENERAL.VERIFY_OTP,
		});
	}
});

userRouter.post(
	'/otp/revalidate',
	resendOTPValidator,
	wrapRequestHandler(userController.resendOTP),
);

userRouter.post(
	'/password/forgot',
	forgotPwdValidator,
	wrapRequestHandler(userController.forgotPwd),
);

userRouter.post(
	'/password/forgot/authenticate',
	verifyValidator,
	wrapRequestHandler(userController.verifyOTPForgotPwd),
);

userRouter.post(
	'/password/reset',
	resetPwdValidator,
	wrapRequestHandler(userController.resetPwd),
);

userRouter.post(
	'/password/change',
	wrapRequestHandler(requireLoginMiddleware),
	ChangePwdValidator,
	wrapRequestHandler(userController.changePwd),
);

userRouter.get(
	'/@me/profile',
	wrapRequestHandler(requireLoginMiddleware),
	wrapRequestHandler(userController.getProfile),
);

userRouter.put(
	'/@me/profile',
	wrapRequestHandler(requireLoginMiddleware),
	updateProfileValidator,
	wrapRequestHandler(userController.updateProfile),
);

userRouter.post('/token/check');

export default userRouter;
