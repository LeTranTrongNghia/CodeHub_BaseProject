import React from 'react';
import config from '../config/index';

const LoginPage = React.lazy(() => import('../container/Auth/Login'));
const RegisterPage = React.lazy(() => import('../container/Auth/Register'));
const ChangePasswordPage = React.lazy(() =>
	import('../container/Auth/ChangePassword'),
);
const ResetPasswordPage = React.lazy(() =>
	import('../container/Auth/ResetPassword'),
);
const MainHomePage = React.lazy(() =>
	import('../container/Home/pages/MainHome'),
);
const ProfilePage = React.lazy(() => import('../container/Profile/Profile'));

const publicRoute = [
	{
		path: config.routes.login,
		component: LoginPage,
	},
	{
		path: config.routes.register,
		component: RegisterPage,
	},
	{
		path: config.routes.changePassword,
		component: ChangePasswordPage,
	},
	{
		path: config.routes.resetPassword,
		component: ResetPasswordPage,
	},
	{
		path: config.routes.home,
		component: MainHomePage,
	},
	{
		path: config.routes.profile,
		component: ProfilePage,
	},
];

export { publicRoute };
