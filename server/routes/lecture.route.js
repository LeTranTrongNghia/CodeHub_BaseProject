import express from 'express';
import { MESSAGES } from '../constants/message.js';
import lectureController from '../controllers/lecture.controller.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';

const lectureRouter = express.Router();

// Get a list of all courses
lectureRouter.get('/', async (req, res) => {
	try {
		await lectureController.getPagination(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.LECTURE.GET_ALL,
		});
	}
});

// Get a single course by id
lectureRouter.get('/:id', async (req, res) => {
	try {
		lectureController.getById(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.LECTURE.GET_BY_ID,
		});
	}
});

// Create a new course
lectureRouter.post('/', async (req, res) => {
	try {
		await lectureController.create(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.LECTURE.CREATE,
		});
	}
});

// Update a lecture by id
lectureRouter.put('/:id', async (req, res) => {
	try {
		await lectureController.update(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.LECTURE.UPDATE,
		});
	}
});

// Delete a lecture by id
lectureRouter.delete('/:id', async (req, res) => {
	try {
		await lectureController.delete(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.LECTURE.DELETE,
		});
	}
});

export default lectureRouter;
