import { Router } from 'express';
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

const userRouter = Router();

userRouter.post(
	'/login',
	loginValidator,
	wrapRequestHandler(userController.login),
);

userRouter.post(
	'/register',
	registerValidator,
	wrapRequestHandler(userController.register),
);

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

userRouter.post(
	'/otp/authenticate',
	verifyValidator,
	wrapRequestHandler(userController.verifyAccount),
);

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
