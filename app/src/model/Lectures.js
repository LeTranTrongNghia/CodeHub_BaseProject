export default class Lectures {
	constructor(id, section_id, title, video_url, content, created_at) {
		this.id = id;
		this.section_id = section_id;
		this.title = title;
		this.video_url = video_url;
		this.content = content;
		this.created_at = created_at;
	}
}
