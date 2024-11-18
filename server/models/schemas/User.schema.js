export default class User {
  _id;
  username;
  email;
  password;
  role;
  gender;
  verify;
  address;
  avatar;
  cover_photo;
  isOnline;
  _destroy;
  providerId;
  provider;
  password_change_at;
  created_at;
  updated_at;
  savedPost;
  position;
  skills;

  constructor(user) {
    this._id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.gender = user.gender || null;
    this.role = user.role || "User";
    this.verify = user.verify || "Unverify";
    this.address = user.address || "";
    this.avatar = user.avatar || "";
    this.cover_photo = user.cover_photo || "";
    this.isOnline = user.isOnline || false;
    this._destroy = user._destroy || false;
    this.provider = user.provider;
    this.providerId = user.providerId;
    this.password_change_at = user.password_change_at || null;
    this.created_at = user.created_at || new Date();
    this.updated_at = user.updated_at || null;
    this.savedPost = user.savedPost || [];
    this.position = user.position || "";
    this.skills = user.skills || [];
  }
}
