import userServices from '../services/user.service.js';
import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';

const userController = {
	register: async (req, res, next) => {
		try {
			const result = await userServices.register(req.body);
			return sendResponse.success(
				res,
				result,
				MESSAGES.SUCCESS_MESSAGES.REGISTER,
			);
		} catch (error) {
			console.log('🚀 ~ register: ~ error:', error);
			next(error);
		}
	},
	login: async (req, res) => {
		try {
			const result = await userServices.login(req.body);
			return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.LOGIN);
		} catch (error) {
			console.log('🚀 ~ login: ~ error:', error);
		}
	},
	verifyAccount: async (req, res) => {
		const result = await userServices.verifyAccount(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.OTP.VERIFY,
		);
	},
	refreshToken: async (req, res) => {
		const result = await userServices.refreshtoken(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.REFRESH_TOKEN,
		);
	},
	logout: async (req, res) => {
		const result = await userServices.logout(req.body);
		return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.LOGOUT);
	},
	resendOTP: async (req, res) => {
		const result = await userServices.sendOTP(req.body.email);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.OTP.RESEND,
		);
	},
	changePwd: async (req, res) => {
		const email = req.user.email;
		const result = await userServices.changePassword({ email, ...req.body });
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.CHANGE_PASSWORD,
		);
	},
	forgotPwd: async (req, res) => {
		const result = await userServices.forgotPassword(req.body.email);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.FORGOT_PASSWORD,
		);
	},
	verifyOTPForgotPwd: async (req, res) => {
		const result = await userServices.verifyOTPForgotPwd(req.body.otp);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.VERIFY_FORGOT_PASSWORD,
		);
	},
	resetPwd: async (req, res) => {
		const result = await userServices.resetPwd(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.RESET_PASSWORD,
		);
	},
	getProfile: async (req, res) => {
		const result = await userServices.getProfile(req.user._id);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.GET_BY_ID,
		);
	},
	updateProfile: async (req, res) => {
		const result = await userServices.updateProfile(req.user._id, req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.UPDATE,
		);
	},
	updateAvatar: async (req, res) => {
		const result = await userServices.uploadAvatar(req.user._id, req.file);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_AVATAR,
		);
	},
	checkToken: async (req, res) => {
		console.log('🚀 ~ checkToken: ~ req.body:', req.body);
		const result = await userServices.checkToken(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.TEST_TOKEN,
		);
	},
};

export default userController;
