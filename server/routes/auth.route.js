import { Router } from 'express';
import { requireRoleMiddleware } from '../middlewares/auth.middleware.js';
import { wrapRequestHandler } from '../utils/handler.js';
import authController from '../controllers/auth.controller.js';

const authRouter = Router();

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
