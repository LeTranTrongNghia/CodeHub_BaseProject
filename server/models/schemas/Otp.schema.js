export default class OTP {
	_id;
	email;
	otp;
	expiredIn;
	created_at;
	updated_at;

	constructor(item) {
		this._id = item._id;
		this.email = item.email;
		this.otp = item.otp;
		this.expiredIn = item.expiredIn || new Date(Date.now() + 5 * 60000);
		this.created_at = item.created_at || new Date();
		this.updated_at = item.updated_at || null;
	}
}
