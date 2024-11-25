import { Router } from 'express';
import uploadController from '../controllers/upload.controller.js';
import {
	multiImageUpload,
	singleImageUpload,
} from '../middlewares/upload.middleware.js';

const uploadRouter = Router();

uploadRouter.post('/single', singleImageUpload, (req, res, next) => {
	try {
		uploadController.uploadSingle(req, res);
	} catch (error) {
		console.log('🚀 ~ uploadRouter.post ~ error:', error);
	}
});

uploadRouter.post('/multiple', multiImageUpload, (req, res, next) => {
	try {
		uploadController.uploadMultiple(req, res);
	} catch (error) {
		console.log('🚀 ~ error:', error);
	}
});

export default uploadRouter;
