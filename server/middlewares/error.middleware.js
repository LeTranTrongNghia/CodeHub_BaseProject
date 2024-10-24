import pkg from 'lodash';
const { omit } = pkg;
import { StatusCodes } from 'http-status-codes';

export const defaultErrorHandler = (err, req, res, next) => {
	try {
		if (err instanceof ErrorWithStatus) {
			return res.status(err.statusCode).json(omit(err, ['statusCode']));
		}
		// Print out stacktrace to find bugs easier
		console.error(err);
		const finalError = {};
		Object.getOwnPropertyNames(err).forEach(key => {
			if (
				!Object.getOwnPropertyDescriptor(err, key)?.configurable ||
				!Object.getOwnPropertyDescriptor(err, key)?.writable
			) {
				return;
			}
			finalError[key] = err[key];
		});
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: finalError.message,
			errorInfo: omit(finalError, ['stack']),
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Internal server error',
			errorInfo: omit(error, ['stack']),
		});
	}
};
