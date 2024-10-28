export default class Course {
	constructor(
		id,
		title,
		description,
		instructor_id,
		category_id,
		created_at,
		updated_at,
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.instructor_id = instructor_id;
		this.category_id = category_id;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
}
