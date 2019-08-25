export const Menus = [
	{
		title: 'Home',
		iconType: 'home',
		pathName: '/'
	},
	{
		title: 'Exam',
		iconType: 'ordered-list',
		pathName: '/exam',
		subMenus: [
			{
				title: 'Exam-2019',
				pathName: '/exam/2019',
			},
			{
				title: 'Exam-2018',
				pathName: '/exam/2018',
			},
			{
				title: 'Exam-2017',
				pathName: '/exam/2017',
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