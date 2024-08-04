import jwt from 'jsonwebtoken';

export const signToken = ({ payload, privateKey, options }) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, privateKey, options, (err, token) => {
			if (err) {
				reject(err);
			}
			resolve(token);
		});
	});
};

export const verifyToken = ({ token, secretOrPublicKey }) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretOrPublicKey, function (err, decoded) {
			if (err) {
				throw reject(err);
			}
			resolve(decoded);
		});
	});
};
