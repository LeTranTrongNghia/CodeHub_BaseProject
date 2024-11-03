const routes = {
	home: '/main-home',
	profile: '/Setting',
	login: '/login',
	register: '/register',
	resetPassword: '/reset-password',
	changePassword: '/change-password',
	forgotPassword: '/forgot-password',
	otp: '/otp',
	notFound: '*',
	coding: '/coding',
	indexHome: '/',
	admin: {
		dashboard: '/admin',
		lecture: 'admin/lecture',
		problemPageAdmin: '/problemsAdmin',
		coursePageAdmin: '/coursesAdmin',
	},
	problemPage: '/problems',
	coursePage: '/courses',
	newCourse: '/new-courses',
	contactPage: '/contact',
	solveProblem: '/problems/solve/:id',
	communityPage: '/community',
	detailPost: '/community/post/detail',
	playgroundPage: '/playground',
};

export default routes;
