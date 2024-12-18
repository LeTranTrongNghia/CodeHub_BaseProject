import { StatusCodes } from 'http-status-codes';
import db from '../db/connection.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import Lecture from '../models/schemas/Lecture.schema.js';
import { ObjectId } from 'mongodb';

class LectureService {
	//tạo bài học mới
	async createLecture(payload) {
		const { video_link, video_id, course_id, timeline } = payload;
		try {
			if (!video_link || !video_id || !course_id || !timeline) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message:
						'All fields (video_link, video_id, course_id, timeline) are required.',
				});
			}
			if (!ObjectId.isValid(course_id)) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: 'Invalid lecture ID.',
				});
			}

			const existingCourse = await db
				.collection('courses')
				.findOne({ _id: new ObjectId(course_id) });

			if (!existingCourse) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: 'Not found course ID.',
				});
			}

			const lecture = new Lecture({
				video_link,
				video_id,
				course_id,
				timeline,
			});

			const result = await db.collection('lectures').insertOne(lecture);

			if (!result.acknowledged) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
					message: 'Failed to create lecture.',
				});
			}

			return lecture;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
				message: error.message || 'Error while creating lecture.',
			});
		}
	}

	async getLectures(page = 1, perPage = 10) {
		try {
			const skip = (page - 1) * perPage;

			const [items, totalItems] = await Promise.all([
				db.collection('lectures').find({}).skip(skip).limit(perPage).toArray(),
				db.collection('lectures').countDocuments(),
			]);

			const totalPages = Math.ceil(totalItems / perPage);

			return {
				items,
				page,
				per_page: perPage,
				total_pages: totalPages,
				total_items: totalItems,
			};
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: 'Error while retrieving lectures.',
			});
		}
	}

	async updateLecture(lectureId, payload) {
		try {
			if (!ObjectId.isValid(lectureId)) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: 'Invalid lecture ID.',
				});
			}

			if (!payload || Object.keys(payload).length === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: 'Update payload is required.',
				});
			}

			const update = {
				...payload,
				updated_at: new Date(),
			};

			const result = await db
				.collection('lectures')
				.updateOne({ _id: new ObjectId(lectureId) }, { $set: update });

			if (result.matchedCount === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: 'Lecture not found.',
				});
			}

			return await db
				.collection('lectures')
				.findOne({ _id: new ObjectId(lectureId) });
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
				message: error.message || 'Error while updating lecture.',
			});
		}
	}

	async deleteLecture(lectureId) {
		try {
			if (!ObjectId.isValid(lectureId)) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: 'Invalid lecture ID.',
				});
			}

			const result = await db
				.collection('lectures')
				.deleteOne({ _id: new ObjectId(lectureId) });

			if (result.deletedCount === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: 'Lecture not found.',
				});
			}
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
				message: error.message || 'Error while deleting lecture.',
			});
		}
	}

	async getLectureById(lectureId) {
		try {
			if (!ObjectId.isValid(lectureId)) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: 'Invalid lecture ID.',
				});
			}

			const lecture = await db
				.collection('lectures')
				.findOne({ _id: new ObjectId(lectureId) });

			if (!lecture) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: 'Lecture not found.',
				});
			}

			return lecture;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
				message: error.message || 'Error while retrieving lecture.',
			});
		}
	}
}

const lectureServices = new LectureService();
export default lectureServices;
