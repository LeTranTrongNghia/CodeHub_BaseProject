const routes = {
	home: '/main-home',
	profile: '/Setting',
	login: '/login',
	register: '/register',
	resetPassword: '/reset-password',
	changePassword: '/change-password',
	forgotPassword: '/forgot-password',
	notFound: '*',
	coding: '/coding',
	indexHome: '/',
	admin: {
		dashboard: '/admin',
		lecture: 'admin/lecture',
	},
	problemPage: '/problems',
	coursePage: '/courses',
	problemPageAdmin: '/problemsAdmin',
	coursePageAdmin: '/coursesAdmin',
	contactPage:'/contact',
};

export default routes;
