import * as Site from '../../site/config/index';

export * from '../../site/config/index';

export const Title = Site.Title || 'app title';
export const MetaDescription = Site.MetaDescription || 'app description';
export const MetaKeyWord = Site.MetaKeyWord || 'app keyword';
export const MetaAuthor = Site.MetaAuthor || 'Steper Kuo';

export const PageTitle = {
	'/': '首页',
	'/about': '关于',
	...Site.PageTitle
};
export const Menus = Site.Menus || [
	{
		title: '首页',
		iconType: 'home',
		pathName: '/'
	},
	{
		title: '关于',
		iconType: 'info-circle',
		pathName: '/about'
	},
];

export const GA_TRACKING_ID  = Site.GA_TRACKING_ID || '';

export const projectColor = Site.projectColor || '#1890FF'; // default
export const bgColor = Site.bgColor ||  '#FFFFFF'; // default