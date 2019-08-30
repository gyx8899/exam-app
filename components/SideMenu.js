import {Menus, Title, MetaDescription} from "../components/api/config";
import {Empty, Icon, Menu, Button} from "antd";
import React from "react";
import Link from "next/link";

const {SubMenu} = Menu;

const MenuLink = (props = {path: '/', name: 'Home'}) => {
	return (
			<Link href={props.path} as={props.as}>
				<span>
					<a>{props.name}</a>
				</span>
			</Link>
	);
};

const SideMenu = ({onClick, selectedMenu}) => {

	const handleShareEvent = () => {
		navigator['share']({
			title: Title,
			text: MetaDescription,
			url: location.origin,
		});
	};

	return (
			<>
				<Menu
						onClick={onClick}
						defaultSelectedKeys={[selectedMenu.index.toString()]}
						defaultOpenKeys={[selectedMenu.subIndex && selectedMenu.subIndex.toString()]}
						mode="inline"
				>
					{
						Menus.map((menu, indexM) => (
								!!menu.subMenus ? (
										<SubMenu
												key={indexM}
												title={(
														<span>
															<Icon type={menu.iconType}/>
															<MenuLink path={menu.pathName} name={menu.title}/>
														</span>
												)}
										>{
											(menu.subMenus.length) ? menu.subMenus.map((subMenu, indexSm) => (
													<Menu.Item key={indexSm}>
														<MenuLink path={subMenu.pathName} name={subMenu.title}/>
													</Menu.Item>
											)) : <Empty/>
										}
										</SubMenu>
								) : (
										<Menu.Item key={indexM}>
											<Icon type={menu.iconType}/>
											<MenuLink path={menu.pathName} name={menu.title}/>
										</Menu.Item>
								)
						))
					}

				</Menu>
				{navigator['share'] && <Button shape="circle" icon="share-alt" onClick={handleShareEvent}/>}
			</>
	);
};

export default SideMenu