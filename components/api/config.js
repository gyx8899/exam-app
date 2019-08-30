export const Title = 'Exam A+';
export const MetaDescription = 'A+ app is one useful exercise exam questions app';
export const MetaKeyWord = 'Exam, Exercise, Excel, App';
export const MetaAuthor = 'Steper Kuo';

export const GA_TRACKING_ID  = 'G-H29X5PLPDJ';

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

export const getMenuByPathName = (pathName) => {
	let menu = {
		index: 0,
		detail: Menus[0]
	};
	for (let i = 0, li = Menus.length; i < li; i++) {
		let menuItem = Menus[i];
		if (pathName === menuItem.pathName) {
			menu.index = i;
			menu.detail = menuItem;
			break;
		} else if (pathName.indexOf(menuItem.pathName) === 0) {
			if (menuItem.subMenus && menuItem.subMenus.length) {
				for (let j = 0, lj = menuItem.subMenus.length; j < lj; j++) {
					let subMenu = menuItem.subMenus[j];
					if (pathName === subMenu.pathName) {
						menu.index = i;
						menu.subIndex = j;
						menu.detail = menuItem;
						menu.subDetail = subMenu;
						break;
					}
				}
				if (!!menu.subIndex) {
					break;
				}
			} else {
				menu.index = i;
				menu.detail = menuItem;
			}
		}
	}
	return {...menu};
};