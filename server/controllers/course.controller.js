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
};

export default courseController;
