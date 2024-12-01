import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import courseController from '../controllers/course.controller.js';
import { MESSAGES } from '../constants/message.js';

const courseRouter = express.Router();

// Get a list of all courses
courseRouter.get('/', async (req, res) => {
	try {
		courseController.getPagination(req, res);
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
		courseController.getById(req.res);
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
		courseController.create(req, res);
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
courseRouter.patch('/:id', async (req, res) => {
	try {
		const query = { _id: new ObjectId(req.params.id) };
		const updates = {
			$set: {
				author: req.body.author,
				image_cover: req.body.image_cover,
				language: req.body.language,
				language_short: req.body.language_short,
				title: req.body.title,
				video_link: req.body.video_link,
				video_id: req.body.video_id,
				lectures: req.body.lectures,
			},
		};

		let collection = await db.collection('courses');
		let result = await collection.updateOne(query, updates);
		res.status(200).send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error updating course');
	}
});

// Delete a course by id
courseRouter.delete('/:id', async (req, res) => {
	try {
		const query = { _id: new ObjectId(req.params.id) };

		const collection = db.collection('courses');
		let result = await collection.deleteOne(query);

		res.status(200).send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error deleting course');
	}
});

export default courseRouter;
