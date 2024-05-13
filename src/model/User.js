export default class User{
    constructor(id, user_name, password, display_name, avatar, day_of_birth, total_score, created_at, updated_at, lock, role_id){
        this.id = id;
        this.user_name = user_name;
        this.password = password;
        this.display_name = display_name;
        this.avatar = avatar;
        this.day_of_birth = day_of_birth;
        this.total_score = total_score;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.lock = lock;
        this.role_id = role_id;
    }
}