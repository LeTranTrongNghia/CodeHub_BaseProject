import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { MESSAGES } from '../constants/message.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import RefreshToken from '../models/schemas/Refreshtoken.schema.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import User from '../models/schemas/User.schema.js';
import passport from 'passport';
import userServices from './user.service.js';
import db from '../db/connection.js';

class AuthService {
	async validateWithIDAccountAccessibility(id) {
		const user = await db
			.collection('users')
			.findOne({ _id: new ObjectId(id) });
		if (!user || ['Unverified', 'Banned'].includes(user.verify)) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.FORBIDDEN,
				message: user
					? user.verify === 'Unverified'
						? MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_UNVERIFIED
						: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_BANNED
					: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_NOT_FOUND,
			});
		}
		return true;
	}

	init() {
		passport.use(
			new GoogleStrategy(
				{
					clientID: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
					callbackURL: process.env.GOOGLE_CALLBACK,
					passReqToCallback: true,
					scope: ['profile', 'email'],
				},
				async function (req, accessToken, refreshToken, profile, done) {
					try {
						let user = await db.collection('users').findOne({
							provider: 'google',
							providerId: profile.id,
						});
						if (!user) {
							const newUser = new User({
								username: profile.displayName,
								email: profile.emails[0].value,
								provider: 'google',
								providerId: profile.id,
								verify: 'Verified',
							});
							const result = await db.collection('users').insertOne(newUser);
							req.user = {
								...newUser,
								_id: result.insertedId.toString(),
							};
							return done(null, newUser);
						}
						req.user = { ...user, _id: user._id.toString() };
						return done(null, user);
					} catch (error) {
						return done(error, null);
					}
				},
			),
		);
		passport.use(
			new GithubStrategy(
				{
					clientID: process.env.GITHUB_CLIENT_ID,
					clientSecret: process.env.GITHUB_CLIENT_SECRET,
					callbackURL: process.env.GITHUB_CALLBACK,
					passReqToCallback: true,
				},
				async function (req, accessToken, refreshToken, profile, done) {
					try {
						const { login, avatar_url, email, id } = profile._json;
						// Nếu GitHub không cung cấp email, sử dụng email placeholder
						const userEmail = email || `${login}@placeholder.com`;
						let user = await db.collection('users').findOne({
							provider: 'github',
							providerId: id.toString(),
						});
						if (!user) {
							const newUser = new User({
								username: login,
								email: userEmail,
								provider: 'github',
								providerId: profile.id,
								verify: 'Verified',
								avatar: avatar_url,
							});
							await db.collection('users').insertOne(newUser);
							req.user = newUser;
							return done(null, newUser);
						}
						req.user = user;
						return done(null, user);
					} catch (error) {
						return done(error, null);
					}
				},
			),
		);
	}

	async callback(provider, req, res) {
		try {
			const { _id, role, email, username } = req.user;
			const [access_token, refresh_token] =
				await userServices.signAccessAndRefreshToken(
					_id.toString(),
					email,
					username,
					role,
				);

			// if user is logged in but still login again
			await db.collection('refreshTokens').deleteOne({
				user_id: new ObjectId(_id),
			});
			await db.collection('refreshTokens').insertOne(
				new RefreshToken({
					token: refresh_token,
					user_id: new ObjectId(_id),
				}),
			);
			res.redirect(`http://localhost:5173/main-home?token=${access_token}`);
		} catch (error) {
			throw new ErrorWithStatus({
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.LOGIN_OAUTH2,
			});
		}
	}
}
const authServices = new AuthService();
export default authServices;
