import { Router } from 'express';
import { requireRoleMiddleware } from '../middlewares/auth.middleware.js';
import { wrapRequestHandler } from '../utils/handler.js';
import authController from '../controllers/auth.controller.js';
import passport from 'passport';
import authServices from '../services/auth.service.js';

authServices.init();
const authRouter = Router();

authRouter.get(
	'/google',
	passport.authenticate('google', {
		session: false,
		scope: ['profile', 'email'],
	}),
);

authRouter.get(
	'/google/callback',
	passport.authenticate('google', {
		session: false,
	}),

	async (req, res, next) => {
		try {
			authController.callback('google')(req, res, next); // Call callback logic
		} catch (error) {
			next(error); // Call error handler
		}
	},
);

authRouter.get('/github', passport.authenticate('github', { session: false }));

authRouter.get(
	'/github/callback',

	passport.authenticate('github', {
		session: false,
	}),

	async (req, res, next) => {
		try {
			authController.callback('github')(req, res, next);
		} catch (error) {
			next(error);
		}
	},
);

authRouter.get(
	'/users',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.getAll),
);

authRouter.get(
	'/users/:id',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.get),
);

authRouter.put(
	'/users/:id',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.update),
);

authRouter.delete(
	'/users/:id',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.delete),
);

authRouter.get(
	'/roles',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.getRoleList),
);

authRouter.put(
	'/roles/:id',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.updateRole),
);

authRouter.delete(
	'/roles/:id',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.deleteRole),
);

authRouter.post(
	'/password/reset',
	wrapRequestHandler(requireRoleMiddleware('Admin')),
	wrapRequestHandler(authController.restPasswordByAdmin),
);

export default authRouter;
