import express from 'express';
import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';
import userController from '../controllers/user.controller.js';
import { requireLoginMiddleware } from '../middlewares/auth.middleware.js';
import {
	ChangePwdValidator,
	forgotPwdValidator,
	refreshTokenValidator,
	resendOTPValidator,
	resetPwdValidator,
	updateProfileValidator,
	verifyValidator,
} from '../middlewares/user.middleware.js';
import userServices from '../services/user.service.js';
import { wrapRequestHandler } from '../utils/handler.js';
// import { sendResponse } from "../config/response.config.js";
import { ErrorWithStatus } from '../models/errors/Error.schema.js';

const userRouter = express.Router();

// routes/user.route.js
// router.get("/me", authMiddleware, async (req, res) => {
//   const userId = req.user.userId; // Được lấy từ middleware sau khi giải mã token

//   try {
//     const user = await User.findById(userId).populate("enrolledCourses");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       userId: user._id,
//       username: user.username,
//     });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

userRouter.post('/login', async (req, res) => {
	try {
		const result = await userServices.login(req.body);
		const response = {};
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

userRouter.post('/token/refresh', refreshTokenValidator, async (req, res) => {
	try {
		const result = await userServices.refreshtoken(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.REFRESH_TOKEN,
		);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.GENERAL.GET_A_TOKEN_FROM_R_TOKEN,
		});
	}
});

userRouter.post(
	'/logout',
	// wrapRequestHandler(requireLoginMiddleware),
	refreshTokenValidator,
	async (req, res) => {
		try {
			await userController.logout(req, res);
		} catch (error) {
			console.log('🚀 ~ error:', error);
		}
	},
);

userRouter.post('/token/refresh', refreshTokenValidator);

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

userRouter.post('/token/check', async (req, res) => {
	try {
		await userController.checkToken(req, res);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.GENERAL.TOKEN,
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
