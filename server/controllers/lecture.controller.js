import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';
import courseServices from '../services/course.service.js';
import lectureServices from '../services/lecture.service.js';

const lectureController = {
	create: async (req, res) => {
		const result = await lectureServices.createLecture(req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.LECTURE.CREATE,
		);
	},
	getPagination: async (req, res) => {
		const { page, limit } = req.query;
		const result = await lectureServices.getLectures(page, limit);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.LECTURE.GET_ALL,
		);
	},
	getById: async (req, res) => {
		const result = await lectureServices.getLectureById(req.params.id);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.LECTURE.GET_BY_ID,
		);
	},
	update: async (req, res) => {
		const result = await lectureServices.updateLecture(req.params.id, req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.LECTURE.UPDATE,
		);
	},
	delete: async (req, res) => {
		await lectureServices.deleteLecture(req.params.id);
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.LECTURE.DELETE,
		);
	},
};

export default lectureController;
