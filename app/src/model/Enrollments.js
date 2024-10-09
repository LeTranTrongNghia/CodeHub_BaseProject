export default class Enrollments {
	constructor(course_id, user_id, progress, created_at) {
		this.course_id = course_id;
		this.user_id = user_id;
		this.progress = progress;
		this.created_at = created_at;
	}
}
