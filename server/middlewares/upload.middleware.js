import { MESSAGES } from '../constants/message.js';
import multer from 'multer';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import { StatusCodes } from 'http-status-codes';
import path from 'path';

const uploadFile = multer({
	limits: {
		fieldSize: 50 * 1024 * 1024,
	},
	fileFilter: (req, file, callback) => {
		const filetypes = /jpeg|jpg|png|gif/;
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase(),
		);
		const mimetype = filetypes.test(file.mimetype);

		if (extname && mimetype) {
			return callback(null, true);
		}
		callback(
			new Error(
				MESSAGES.VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_FILE_TYPE,
			),
		);
	},
});

export const singleImageUpload = (req, res, next) => {
	uploadFile.single('image')(req, res, err => {
		if (!req.file) {
			return next(
				new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.UPLOAD.IMAGE.FILE_NOT_FOUND,
				}),
			);
		}
		if (err instanceof multer.MulterError) {
			next(
				new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_SIZE,
				}),
			);
		}
		if (err instanceof Error) {
			next(
				new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message:
						MESSAGES.VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_EXTENSION,
				}),
			);
		}

		next();
	});
};

export const multiImageUpload = (req, res, next) => {
	const MAXIMUM_OF_IMAGES = 4;
	uploadFile.array('image', MAXIMUM_OF_IMAGES)(req, res, err => {
		if (!req.files) {
			return next(
				new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.UPLOAD.IMAGE.FILE_NOT_FOUND,
				}),
			);
		}
		if (err instanceof multer.MulterError) {
			next(
				new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.UPLOAD.IMAGE.MAX_IMAGE_UPLOAD,
				}),
			);
		}
		if (err instanceof Error) {
			next(
				new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message:
						MESSAGES.VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_EXTENSION,
				}),
			);
		}
		next();
	});
};
