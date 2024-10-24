export default class Section {
	constructor(id, course_id, title, order, content, created_at) {
		this.id = id;
		this.course_id = course_id;
		this.title = title;
		this.order = order;
		this.content = content;
		this.created_at = created_at;
	}
}
