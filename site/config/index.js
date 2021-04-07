export const Title = '考试 A+ 助手';
export const MetaDescription =
	'《考试 A+ 助手》，一款基于 Next.js 的 考试 A+ 助手应用，通过使用 excel 文件形式的考题文件，转换成 JSON 数据，展现在考题页面，形成一个供用户练习考题的应用。';
export const MetaKeyWord =
	'考试，考试题库，练习，考试练习，助手，应用，excel，2020，金护帽，消防测试';
export const MetaAuthor = 'Steper Kuo';

export const GA_TRACKING_ID = 'G-H29X5PLPDJ';

export const projectColor = '#1890FF';
export const bgColor = '#FFFFFF';

export const PageTitle = {
	'/': '首页',
	'/about': '关于',
	'/exam': '试题',
};
export const Menus = [
	{
		title: '考试 A+ 助手',
		iconType: 'home',
		pathName: '/',
	},
	{
		title: '试题',
		iconType: 'ordered-list',
		pathName: '/exam',
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
		],
	},
	{
		title: '关于',
		iconType: 'info-circle',
		pathName: '/about',
	},
];

// Custom page config
export const PaperPageSize = 10;
export const OptionsType = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
