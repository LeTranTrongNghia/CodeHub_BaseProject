import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';
import authServices from '../services/auth.service.js';

const authController = {
	get: async (req, res, next) => {
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.AUTH.GET_BY_ID,
		);
	},

	getAll: async (req, res, next) => {
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.AUTH.GET_ALL,
		);
	},

	update: async (req, res, next) => {
		return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.UPDATE);
	},

	delete: async (req, res, next) => {
		return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.DELETE);
	},

	getRoleList: async (req, res, next) => {
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.AUTH.GET_ROLES,
		);
	},

	updateRole: async (req, res, next) => {
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.AUTH.UPDATE_ROLE,
		);
	},

	deleteRole: async (req, res, next) => {
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.AUTH.DELETE_ROLE,
		);
	},

	restPasswordByAdmin: async (req, res, next) => {
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.AUTH.RESET_PASSWORD,
		);
	},
	callback: provider => async (req, res, next) => {
		try {
			await authServices.callback(provider, req, res);
		} catch (error) {
			next(error);
		}
	},
};

export default authController;
