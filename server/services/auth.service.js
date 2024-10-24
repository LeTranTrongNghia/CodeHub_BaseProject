import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { MESSAGES } from '../constants/message.js';
import { ErrorWithStatus } from '../models/errors/Error.schema.js';
import { databaseService } from './database.service.js';
import RefreshToken from '../models/schemas/Refreshtoken.schema.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import User from '../models/schemas/User.schema.js';
import passport from 'passport';
import userServices from './user.service.js';

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
								username: profile._json.name,
								email: profile._json.email,
								provider: 'google',
								providerId: profile.id,
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
		// passport.use(
		// 	new GithubStrategy(
		// 		{
		// 			clientID: env.oauth2.github.client_id,
		// 			clientSecret: env.oauth2.github.client_secret,
		// 			callbackURL: env.oauth2.github.callback_url,
		// 			passReqToCallback: true,
		// 		},
		// 		async function (req, accessToken, refreshToken, profile, done) {
		// 			try {
		// 				let user = await db.collection('users').findOne({
		// 					provider: 'github',
		// 					providerId: profile.id,
		// 				});
		// 				if (!user) {
		// 					const newUser = new User({
		// 						username: profile.login,
		// 						email: profile.email,
		// 						provider: 'github',
		// 						providerId: profile.id,
		// 					});
		// 					await db.collection('users').insertOne(newUser);
		// 					req.user = newUser;
		// 					return done(null, newUser);
		// 				}
		// 				req.user = user;
		// 				return done(null, user);
		// 			} catch (error) {
		// 				return done(error, null);
		// 			}
		// 		},
		// 	),
		// );
	}

	async callback(provider, req, res) {
		const { _id, role, email, username } = req.user;
		const refresh_token = await userServices.signRefreshToken(
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
	}
}
const authServices = new AuthService();
export default authServices;
