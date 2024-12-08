import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../constants/message.js';
import db from '../db/connection.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import Progress from '../models/schemas/Progress.schema.js';
import { ObjectId } from 'mongodb';

class ProgressService {
	// Tạo tiến trình học mới
	async createProgress(payload) {
		const { user_id, course_id, lesson_id, status, lessons, exercises } = payload;
		try {
			// Kiểm tra nếu user_id không có
			if (!user_id) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.PROGRESS.FIELD_CREATE_REQUIRED,
				});
			}

			// Tạo đối tượng progress từ constructor đã có
			const progress = new Progress({
				user_id,
				lessons: lessons || [], // Allow lessons to be null or an empty array
				exercises: exercises || [], // Allow exercises to be null or an empty array
				created_at: new Date(), // Set created_at to current date
				updated_at: new Date(), // Set updated_at to current date
			});

			// Chèn vào cơ sở dữ liệu MongoDB
			const result = await db.collection('progress').insertOne(progress);

			// Kiểm tra nếu việc chèn không thành công
			if (!result.acknowledged) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
					message: MESSAGES.ERROR_MESSAGES.GENERAL.CREATE_PROGRESS,
				});
			}

			// Trả về đối tượng progress đã được tạo
			return progress;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.CREATE_PROGRESS,
			});
		}
	}

	// Lấy danh sách các tiến trình học với phân trang
	async getProgress(page = 1, per_page = 10) {
		try {
			// Tính toán skip và limit cho phân trang
			const skip = (page - 1) * per_page;
			const limit = per_page;

			// Lấy danh sách các tiến trình từ database với phân trang
			const progress = await db
				.collection('progress')
				.find()
				.skip(skip)
				.limit(limit)
				.toArray();

			// Tính tổng số tiến trình trong database
			const totalItems = await db.collection('progress').countDocuments();

			// Tính số trang dựa trên tổng số tiến trình và số mục mỗi trang
			const totalPages = Math.ceil(totalItems / per_page);

			// Trả về kết quả phân trang
			return {
				items: progress,
				page: page,
				per_page: per_page,
				total_pages: totalPages,
				total_items: totalItems,
			};
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.GET_PROGRESS,
			});
		}
	}

	// Cập nhật thông tin tiến trình học
	async updateProgress(id, payload) {
		try {
			if (Object.keys(payload).length === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.PROGRESS.ALL_FIELD_IS_REQUIRED,
				});
			}

			const update = {
				...payload,
				updated_at: new Date(),
			};

			const result = await db
				.collection('progress')
				.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: update },
					{ upsert: false },
				);

			if (result.modifiedCount === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: MESSAGES.ERROR_MESSAGES.PROGRESS.NOT_FOUND,
				});
			}

			const progress = await db
				.collection('progress')
				.findOne({ _id: new ObjectId(id) });

			return new Progress(progress);
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.PROGRESS.UPDATE,
			});
		}
	}

	// Xóa tiến trình học
	async deleteProgress(id) {
		try {
			const result = await db
				.collection('progress')
				.deleteOne({ _id: new ObjectId(id) });

			if (result.deletedCount === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: MESSAGES.ERROR_MESSAGES.PROGRESS.NOT_FOUND,
				});
			}
			return;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.PROGRESS.DELETE,
			});
		}
	}

	// Lấy tiến trình học theo ID
	async getProgressById(progressId) {
		try {
			// Kiểm tra ID có hợp lệ không
			if (!ObjectId.isValid(progressId)) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.PROGRESS.ID_INVALID,
				});
			}

			// Tìm tiến trình theo ID
			const progress = await db
				.collection('progress')
				.findOne({ _id: new ObjectId(progressId) });

			// Nếu không tìm thấy, trả về lỗi
			if (!progress) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: MESSAGES.VALIDATION_MESSAGES.PROGRESS.NOT_FOUND,
				});
			}

			return progress;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.GET_PROGRESS,
			});
		}
	}

	// Lấy tiến trình học theo User ID
	async getProgressByUserId(userId) {
		try {
			// Kiểm tra User ID có hợp lệ không
			if (!ObjectId.isValid(userId)) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.PROGRESS.USER_ID_INVALID,
				});
			}

			// Tìm tất cả tiến trình của user
			const progress = await db
				.collection('progress')
				.find({ user_id: new ObjectId(userId) })
				.toArray();

			return progress;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.GET_PROGRESS_BY_USER,
			});
		}
	}
}

const progressServices = new ProgressService();
export default progressServices;