import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { ErrorEnity, ErrorWithStatus } from '../models/errors/Error.schema.js';

const validate = validations => {
	return async (req, res, next) => {
		// Truyền req vào để tiến hành validate dữ liệu
		await validations.run(req);
		// Đưa lỗi vào biến req -> gọi validation result để nhận lỗi
		const errors = validationResult(req);
		// Không có lỗi thì next tiếp tục request
		if (errors.isEmpty()) {
			return next();
		}
		const errorObject = errors.mapped();
		const entityError = new ErrorEnity({ errors: {} });
		for (const key in errorObject) {
			const { msg } = errorObject[key];
			if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
				// msg có tồn tại trong ErrorWithStatus và status phải khác với 422 tức là lỗi validation
				if (
					msg instanceof ErrorWithStatus &&
					msg.statusCode !== StatusCodes.UNPROCESSABLE_ENTITY
				) {
					return next(msg);
				}
			}
			entityError.errors[key] = errorObject[key];
		}
		// Lỗi do validation thông thường
		next(entityError);
	};
};

export const validateObjectId = (value, message) => {
	if (!ObjectId.isValid(value)) {
		throw new ErrorWithStatus({
			message: message,
			statusCode: StatusCodes.NOT_FOUND,
		});
	}

	return true;
};

export default validate;
