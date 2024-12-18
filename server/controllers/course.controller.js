import { sendResponse } from '../config/response.config.js';
import { MESSAGES } from '../constants/message.js';
import courseServices from '../services/course.service.js';

const courseController = {
	create: async (req, res, next) => {
		try {
			const result = await courseServices.createCourse(req.body);
			return sendResponse.success(
				res,
				result,
				MESSAGES.SUCCESS_MESSAGES.COURSE.CREATE,
			);
		} catch (error) {
			next(error);
		}
	},
	getPagination: async (req, res) => {
		const { page, limit } = req.query;
		const result = await courseServices.getCourses(page, limit);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.COURSE.GET_ALL,
		);
	},
	getById: async (req, res) => {
		const result = await courseServices.getCourseById(req.params.id);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.COURSE.GET_BY_ID,
		);
	},
	update: async (req, res) => {
		const result = await courseServices.updateCourse(req.params.id, req.body);
		return sendResponse.success(
			res,
			result,
			MESSAGES.SUCCESS_MESSAGES.COURSE.UPDATE,
		);
	},
	delete: async (req, res) => {
		await courseServices.deleteCourse(req.params.id);
		return sendResponse.success(
			res,
			'',
			MESSAGES.SUCCESS_MESSAGES.COURSE.DELETE,
		);
	},
};

export default courseController;
