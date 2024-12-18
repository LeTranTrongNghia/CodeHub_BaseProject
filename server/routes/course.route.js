import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import courseController from '../controllers/course.controller.js';
import { MESSAGES } from '../constants/message.js';

const courseRouter = express.Router();

// Get a list of all courses
courseRouter.get('/', async (req, res) => {
	try {
		await courseController.getPagination(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.COURSE.GET_ALL,
		});
	}
});

// Get a single course by id
courseRouter.get('/:id', async (req, res) => {
	try {
		await courseController.getById(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.COURSE.GET_BY_ID,
		});
	}
});

// Create a new course
courseRouter.post('/', async (req, res) => {
	try {
		await courseController.create(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.COURSE.CREATE,
		});
	}
});

// Update a course by id
courseRouter.put('/:id', async (req, res) => {
	try {
		await courseController.update(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.COURSE.CREATE,
		});
	}
});

// Delete a course by id
courseRouter.delete('/:id', async (req, res) => {
	try {
		await courseController.delete(req, res);
	} catch (error) {
		if (error instanceof ErrorWithStatus) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				message: error.message,
			});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: MESSAGES.ERROR_MESSAGES.COURSE.DELETE,
		});
	}
});

export default courseRouter;
