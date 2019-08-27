export const Menus = [
	{
		title: '首页',
		iconType: 'home',
		pathName: '/'
	},
	{
		title: '试题',
		iconType: 'ordered-list',
		pathName: '/exam'
	},
	{
		title: '其他',
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
		title: '关于',
		iconType: 'info-circle',
		pathName: '/about'
	},
];

export const Tabs = [];