import {Menus} from "./config";

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