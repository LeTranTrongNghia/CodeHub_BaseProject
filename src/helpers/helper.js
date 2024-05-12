import bcrypt from 'bcryptjs';
export const hashPwd = password => {
	const saltRounds = 10;
	const result = bcrypt.hashSync(password, saltRounds);
	return result;
};
