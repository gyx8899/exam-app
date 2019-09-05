export const Title = '考试 A+ 助手';
export const MetaDescription = '考试 A+ 助手是一款辅助用户练习考题的应用，支持离线使用，';
export const MetaKeyWord = '考试，练习，助手，应用，excel';
export const MetaAuthor = 'Steper Kuo';

export const GA_TRACKING_ID  = 'G-H29X5PLPDJ';
export const themeColor = '#1890FF';
export const bgColor = '#FFFFFF';

export const PageTitle = {
	'/': '首页',
	'/about': '关于',
	'/exam': '试题'
};
export const Menus = [
	{
		title: '考试 A+ 助手',
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
				title: '考试 A+ 助手',
				pathName: '/',
			},
			{
				title: '关于',
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

// Custom page config
export const PaperPageSize = 10;
export const OptionsType = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const isRightType = {
	INIT: '0',
	RIGHT: '1',
	WRONG: '-1'
};