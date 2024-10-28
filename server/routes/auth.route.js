import { Router } from 'express';
import { requireRoleMiddleware } from '../middlewares/auth.middleware.js';
import { wrapRequestHandler } from '../utils/handler.js';
import authController from '../controllers/auth.controller.js';
import passport from 'passport';
import authServices from '../services/auth.service.js';

authServices.init();
const authRouter = Router();

authRouter.get('/google', async (req, res) => {
	try {
		passport.authenticate('google', { session: false, scope: ['email'] });
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: 'Login google failed',
		});
	}
});

authRouter.get('/google/callback', async (req, res) => {
	try {
		console.log('at callback');

		passport.authenticate('google', {
			session: false,
			successRedirect: 'http://localhost:5713/',
			failureRedirect: '/login',
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: 'Login google failed',
		});
	}
});

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
