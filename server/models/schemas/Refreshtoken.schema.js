export default class RefreshToken {
	_id;
	user_id;
	token;
	created_at;
	updated_at;

	constructor(refreshToken) {
		this._id = refreshToken._id;
		this.user_id = refreshToken.user_id;
		this.token = refreshToken.token;
		this.created_at = refreshToken.created_at || new Date();
		this.updated_at = refreshToken.updated_at || null;
	}
}
