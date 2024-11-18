import pkg from 'cloudinary';
const { UploadApiResponse, v2: cloudinary } = pkg;
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../constants/message.js';
import streamifier from 'streamifier';
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

class CloudinaryService {
	async uploadImage(folder, imageBuffer) {
		try {
			return new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{ folder, format: 'jpg' },
					(error, result) => {
						if (error) {
							reject(
								new ErrorWithStatus({
									statusCode:
										error.http_code || StatusCodes.INTERNAL_SERVER_ERROR,
									message:
										error.message.charAt(0).toUpperCase() +
										error.message.slice(1),
								}),
							);
						} else {
							resolve(result);
						}
					},
				);

				streamifier.createReadStream(imageBuffer).pipe(uploadStream);
			});
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.http_code || StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.UPLOAD.IMAGE,
			});
		}
	}

	async deleteImage(url) {
		try {
			const publicId = extractPublicId(url);
			return new Promise((resolve, reject) => {
				cloudinary.api.delete_resources([publicId], (error, result) => {
					if (error) {
						reject(
							new ErrorWithStatus({
								statusCode:
									error.http_code || StatusCodes.INTERNAL_SERVER_ERROR,
								message: error.message,
							}),
						);
					} else {
						resolve(result);
					}
				});
			});
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.http_code || StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.USER.UPLOAD_IMAGE,
			});
		}
	}
}

const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
