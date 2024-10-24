import moment from 'moment';
import { StatusCodes } from 'http-status-codes';

export const sendResponse = {
	success: (res, data, message, note) => {
		res.status(StatusCodes.OK).json({
			statusCode: StatusCodes.OK,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	created: (res, data, message, note) => {
		res.status(StatusCodes.CREATED).json({
			statusCode: StatusCodes.CREATED,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	noContent: (res, data, message, note) => {
		res.status(StatusCodes.NO_CONTENT).json({
			statusCode: StatusCodes.NO_CONTENT,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	badRequest: (res, data, message, note) => {
		res.status(StatusCodes.BAD_REQUEST).json({
			statusCode: StatusCodes.BAD_REQUEST,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	unauthorized: (res, data, message, note) => {
		res.status(StatusCodes.UNAUTHORIZED).json({
			statusCode: StatusCodes.UNAUTHORIZED,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	forbidden: (res, data, message, note) => {
		res.status(StatusCodes.FORBIDDEN).json({
			statusCode: StatusCodes.FORBIDDEN,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	notFound: (res, data, message, note) => {
		res.status(StatusCodes.NOT_FOUND).json({
			statusCode: StatusCodes.NOT_FOUND,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	noAcceptable: (res, data, message, note) => {
		res.status(StatusCodes.NOT_ACCEPTABLE).json({
			statusCode: StatusCodes.NOT_ACCEPTABLE,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	conflict: (res, data, message, note) => {
		res.status(StatusCodes.CONFLICT).json({
			statusCode: StatusCodes.CONFLICT,
			message,
			data,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	tooManyRequest: (res, message, note) => {
		res.status(StatusCodes.TOO_MANY_REQUESTS).json({
			statusCode: StatusCodes.TOO_MANY_REQUESTS,
			message,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
	error: (res, message, note) => {
		// Lấy statusCode từ đối tượng lỗi, nếu không có thì mặc định là 500
		const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

		// Lấy message từ đối tượng lỗi, nếu không có thì sử dụng message mặc định
		const messageStr = error.message || 'Internal Server Error';
		// res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		// 	statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		// 	message,
		// 	dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
		// 	messageConstants: note,
		// });
		res.status(statusCode).json({
			statusCode: statusCode,
			message: messageStr,
			dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
			messageConstants: note,
		});
	},
};
