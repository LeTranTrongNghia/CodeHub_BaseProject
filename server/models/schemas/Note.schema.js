export default class Note {
	_id;
	content;
	time;
	created_at;
	updated_at;

	constructor(note) {
		this._id = note._id;
		this.content = note.content;
		this.time = note.time;
		this.created_at = note.created_at || new Date();
		this.updated_at = note.updated_at || new Date();
	}
}
