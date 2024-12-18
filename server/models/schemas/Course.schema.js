export default class Course {
	_id;
	author;
	image_cover;
	language;
	language_short;
	title;
	overview;
	updated_at;

	constructor(course) {
		this._id = course._id;
		this.author = course.author;
		this.image_cover = course.image_cover || null;
		this.language = course.language;
		this.language_short = course.language_short;
		this.title = course.title;
		this.overview = course.overview;
		this.updated_at = course.updated_at || new Date();
	}
}
