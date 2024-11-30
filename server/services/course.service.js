import { StatusCodes } from 'http-status-codes';
import pkg from 'jsonwebtoken';
import { MESSAGES } from '../constants/message.js';
import db from '../db/connection.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import Course from '../models/schemas/Course.schema.js';
const { JsonWebTokenError } = pkg;

class CourseService {
	// Tạo khóa mới
	async createCourse(payload) {
		const { author, image_cover, language, language_short, title, overview } =
			payload;
		try {
			// Kiểm tra nếu có trường thông tin bắt buộc thiếu
			if (!author || !language || !language_short || !title || !overview) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.COURSE.FIELD_CREATE_REQUIRED,
				});
			}

			// Tạo đối tượng course từ constructor đã có
			const course = new Course({
				author,
				image_cover, // Nếu không có image_cover, nó sẽ tự động gán giá trị null
				language,
				language_short,
				title,
				overview,
			});

			// Chèn vào cơ sở dữ liệu MongoDB
			const result = await db.collection('courses').insertOne(course);

			// Kiểm tra nếu việc chèn không thành công
			if (!result.acknowledged) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
					message: MESSAGES.ERROR_MESSAGES.GENERAL.CREATE_COURSE,
				});
			}

			// Trả về đối tượng course đã được tạo
			return course;
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.CREATE_COURSE,
			});
		}
	}

	// Lấy danh sách các khóa học với phân trang
	async getCourses(page = 1, per_page = 10) {
		try {
			// Tính toán skip và limit cho phân trang
			const skip = (page - 1) * per_page;
			const limit = per_page;

			// Lấy danh sách các khóa học từ database với phân trang
			const courses = await db
				.collection('courses')
				.find() // Nếu có filter, có thể thêm vào .find({ ...filter })
				.skip(skip)
				.limit(limit)
				.toArray();

			// Tính tổng số khóa học trong database
			const totalItems = await db.collection('courses').countDocuments();

			// Tính số trang dựa trên tổng số khóa học và số mục mỗi trang
			const totalPages = Math.ceil(totalItems / per_page);

			// Trả về kết quả phân trang
			return {
				items: courses,
				page: page,
				per_page: per_page,
				total_pages: totalPages,
				total_items: totalItems,
			};
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.GET_COURSES,
			});
		}
	}

	// Cập nhật thông tin khóa học
	async updateCourse(id, payload) {
		try {
			if (Object.keys(payload).length === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.BAD_REQUEST,
					message: MESSAGES.VALIDATION_MESSAGES.COURSE.FIELD_UPDATE_REQUIRED,
				});
			}

			const update = {
				...payload,
				updated_at: new Date(),
			};

			const result = await db
				.collection('courses')
				.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: update },
					{ upsert: false },
				);

			if (result.modifiedCount === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: MESSAGES.ERROR_MESSAGES.GENERAL.COURSE_NOT_FOUND,
				});
			}

			const course = await db
				.collection('courses')
				.findOne({ _id: new ObjectId(id) });

			return new Course(course); // Trả về khóa học đã cập nhật
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.UPDATE_COURSE,
			});
		}
	}

	// Xóa khóa học
	async deleteCourse(id) {
		try {
			const result = await db
				.collection('courses')
				.deleteOne({ _id: new ObjectId(id) });

			if (result.deletedCount === 0) {
				throw new ErrorWithStatus({
					statusCode: StatusCodes.NOT_FOUND,
					message: MESSAGES.ERROR_MESSAGES.GENERAL.COURSE_NOT_FOUND,
				});
			}

			return { message: 'Course deleted successfully' };
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.ERROR_MESSAGES.GENERAL.DELETE_COURSE,
			});
		}
	}
}

const courseServices = new CourseService();
export default courseServices;
