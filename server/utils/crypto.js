import { createHash, randomBytes, randomInt } from 'crypto';

export const sha256 = content =>
	createHash('sha256').update(content).digest('hex');

export const generatePassword = () => randomBytes(8).toString('hex');

export const hashPassword = password =>
	sha256(password + process.env.OTP_SECRET);

export const generateOTPCode = () => randomInt(100000, 999999).toString();

export const generateIdComment = () => randomInt(10000000, 99999999).toString();

export const hashOTP = otp => sha256(otp + process.env.OTP_SECRET);
