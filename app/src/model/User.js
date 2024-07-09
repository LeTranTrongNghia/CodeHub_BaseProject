import { UserRole } from '@/helpers/constant';

export default class User {
	constructor(
		id,
		email,
		password,
		display_name,
		avatar,
		day_of_birth,
		total_score,
		created_at,
		updated_at,
		lock,
		role,
	) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.display_name = display_name || '';
		this.avatar = avatar || '';
		this.day_of_birth = day_of_birth || '';
		this.total_score = total_score || null;
		this.created_at = created_at || new Date();
		this.updated_at = updated_at || null;
		this.lock = lock || false;
		this.role = role || UserRole.USER;
	}

	toPlainObject() {
		return {
			id: this.id,
			email: this.email,
			password: this.password,
			display_name: this.display_name,
			avatar: this.avatar,
			day_of_birth: this.day_of_birth,
			total_score: this.total_score,
			created_at: this.created_at,
			updated_at: this.updated_at,
			lock: this.lock,
			role: this.role,
		};
	}
}
