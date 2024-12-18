export default class Progress {
  _id;
  user_id;
  lessons;
  exercises;
  created_at;
  updated_at;

  constructor(progress) {
    this._id = progress._id;
    this.user_id = progress.user_id;
    this.lessons = progress.lessons || [];  // [{course_id, lecture_name, completion_date}]
    this.exercises = progress.exercises || []; // [{exercise_id, completion_date}]
    this.created_at = progress.created_at || new Date();
    this.updated_at = progress.updated_at || new Date();
  }
}