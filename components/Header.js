import React, {useState} from "react";
import {Button, PageHeader, Drawer, Menu, Icon, Empty, Avatar} from "antd";
import Link from "next/link";
import {useRouter} from "next/router";
import {Menus} from "../static/config";
import {getMenuByPathName} from "./api/config";
import {useSelector} from "react-redux";

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

const Header = () => {
	const [visible, setVisible] = useState(false);
	const library = useSelector(state => state.exam.library);

	const showDrawer = () => setVisible(true);
	const hideDrawer = () => setVisible(false);

	const {pathname, query} = useRouter();
	const selectedMenu = getMenuByPathName(pathname);
	const title = selectedMenu.subDetail ? selectedMenu.subDetail.title : selectedMenu.detail.title;

	const customProps = {};
	if (pathname.split('/').length > 2) {
		customProps.onBack = () => window.history.back();
		if (pathname.indexOf('/exam/') === 0) {
			customProps.subTitle = library[query.examId].title;
		}
	}

	return (
			<header>
				<PageHeader title={title}
										extra={<Button icon="menu" size="small" type="link" onClick={showDrawer}/>}
										{...customProps}
				/>
				<Drawer
						title={<Avatar src="/static/icons/favicon-32x32.png" />}
						placement="left"
						closable={false}
						onClose={hideDrawer}
						visible={visible}
				>
					<Menu
							onClick={hideDrawer}
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
				</Drawer>
			</header>
	);
};

export default Header