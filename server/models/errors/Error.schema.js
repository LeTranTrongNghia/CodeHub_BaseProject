import moment from 'moment';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../../constants/message.js';

export class ErrorWithStatus extends Error {
	statusCode;
	message;
	created_at;
	updated_at;
	messageConstants;

	constructor(item) {
		super(item.message);
		this.statusCode = item.statusCode;
		this.message = item.message;
		this.created_at =
			item.created_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS');
		this.updated_at =
			item.updated_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS');
		this.messageConstants = item.messageConstants || null;
	}
}

export class ErrorEnity extends ErrorWithStatus {
	errors;
	constructor({ message = MESSAGES.VALIDATION_MESSAGES.TITLE, errors }) {
		super({ message, statusCode: StatusCodes.UNPROCESSABLE_ENTITY });
		this.errors = errors;
	}
}
