import {Menus} from "../../static/config";

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
		} else if (menuItem.pathName.indexOf(pathName) === 0 && menuItem.subMenus && menuItem.subMenus.length) {
			for (let j = 0, lj = menuItem.subMenus.length; j < lj; j++) {
				let subMenu = menuItem.subMenus[j];
				if (pathName === subMenu.pathName) {
					console.log(i, j, subMenu);
					menu.index = i;
					menu.subIndex = j;
					menu.detail = menuItem;
					menu.subDetail = subMenu;
					break;
				}
			}
			if(!!menu.subIndex) {
				break;
			}
		}
	}
	return {...menu};
};