export default class Lecture {
	_id;
	video_link;
	video_id;
	course_id;
	timeline;

	constructor(lecture) {
		this._id = lecture._id;
		this.video_link = lecture.video_link || null;
		this.video_id = lecture.video_id || null;
		this.course_id = lecture.course_id || null;
		this.timeline = lecture.timeline || null;
	}
}
