export const Menus = [
	{
		title: 'Home',
		iconType: 'home',
		pathName: '/'
	},
	{
		title: 'Exam',
		iconType: 'ordered-list',
		pathName: '/exam'
	},
	{
		title: 'Others',
		iconType: 'ordered-list',
		pathName: '/exam',
		subMenus: [
			{
				title: 'Error',
				pathName: '/error',
			},
			{
				title: 'Home',
				pathName: '/',
			},
			{
				title: 'About',
				pathName: '/about',
			},
		]
	},
	{
		title: 'About',
		iconType: 'info-circle',
		pathName: '/about'
	},
];

export const Tabs = [];