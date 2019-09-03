export const Title = '考试 A+';
export const MetaDescription = 'A+ app is one useful exercise exam questions app';
export const MetaKeyWord = 'Exam, Exercise, Excel, App';
export const MetaAuthor = 'Steper Kuo';

export const GA_TRACKING_ID  = 'G-H29X5PLPDJ';
export const themeColor = '#1890FF';
export const bgColor = '#FFFFFF';

export const Menus = [
	{
		title: '考试 A+',
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

export const PaperPageSize = 10;