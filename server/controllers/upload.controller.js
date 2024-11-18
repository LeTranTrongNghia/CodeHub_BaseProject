import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';
import uploadService from '../services/upload.service.js';

const uploadController = {
	uploadSingle: async (req, res) => {
		const result = await uploadService.uploadSingelImage(req.file);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_IMAGE,
		);
	},
	uploadMultiple: async (req, res) => {
		const files = req.files;
		const uploadResults = await uploadService.uploadMultipleImages(files);
		return sendResponse.success(
			res,
			uploadResults,
			MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_MUL_IMAGE,
		);
	},
};

export default uploadController;
