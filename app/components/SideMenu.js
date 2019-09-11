import {Menus, Title, MetaDescription} from "../config/index";
import {Empty, Icon, Menu, Button} from "antd";
import React from "react";
import Router from "next/router";

const {SubMenu} = Menu;

const SideMenu = ({onClick, selectedMenu}) => {

	const handleShareEvent = () => {
		navigator['share']({
			title: Title,
			text: MetaDescription,
			url: location.origin,
		});
	};

	const handleMenuClickEvent = (data) => {
		onClick();
		Router.push({
			pathname: data.item.props.pathname
		})
	};

	return (
			<>
				<Menu
						onClick={handleMenuClickEvent}
						defaultSelectedKeys={[selectedMenu.index.toString()]}
						defaultOpenKeys={[selectedMenu.subIndex && selectedMenu.subIndex.toString()]}
						mode="inline"
				>
					{
						Menus.map((menu, indexM) => (
								!!menu.subMenus ? (
										<SubMenu
												key={indexM}
												pathname={menu.pathName}
												title={(
														<span>
															<Icon type={menu.iconType}/>
															<span>{menu.title}</span>
														</span>
												)}
										>{
											(menu.subMenus.length) ? menu.subMenus.map((subMenu, indexSm) => (
													<Menu.Item key={indexSm} pathname={subMenu.pathName}>
														{subMenu.title}
													</Menu.Item>
											)) : <Empty/>
										}
										</SubMenu>
								) : (
										<Menu.Item key={indexM} pathname={menu.pathName}>
											<Icon type={menu.iconType}/>
											<span>{menu.title}</span>
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