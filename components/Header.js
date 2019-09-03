import React, {useState} from "react";
import {Button, PageHeader, Drawer, Avatar} from "antd";
import Router, {useRouter} from "next/router";
import {getMenuByPathName} from "./api/util";
import {useSelector} from "react-redux";
import SideMenu from './SideMenu';
import {Title, themeColor, bgColor} from "./api/config";

const Header = () => {
	const [visible, setVisible] = useState(false);
	const library = useSelector(state => state.exam.library);

	const showDrawer = () => setVisible(true);
	const hideDrawer = () => setVisible(false);

	const {pathname, query} = useRouter();
	const selectedMenu = getMenuByPathName(pathname);
	const title = selectedMenu.subDetail ? selectedMenu.subDetail.title : selectedMenu.detail.title;

	const customProps = {};
	if (pathname.indexOf('/exam') === 0 && query.id) {
		customProps.onBack = () => Router.back();
		customProps.subTitle = library[query.id] && library[query.id].title;
	}

	return (
			<header>
				<PageHeader title={<Button icon="menu" size="large" type="link" style={{color: bgColor, padding: '0', height: 'auto'}} onClick={showDrawer}>{title}</Button>}
										style={{backgroundColor: themeColor}}
										{...customProps}
				/>
				<Drawer
						title={(
								<><Avatar shape="square" src="/static/icons/favicon-96x96.png" />
								<a style={{verticalAlign: 'middle',marginLeft: '10px'}}>{Title}</a></>
						)}
						placement="left"
						closable={false}
						onClose={hideDrawer}
						visible={visible}
				>
					<SideMenu onClick={hideDrawer} selectedMenu={selectedMenu}/>
				</Drawer>
			</header>
	);
};

export default Header