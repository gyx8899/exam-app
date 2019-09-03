import React, {useEffect, useState} from "react";
import {Button, PageHeader, Drawer, Avatar} from "antd";
import Router, {useRouter} from "next/router";
import {getMenuByPathName} from "./api/util";
import {useSelector} from "react-redux";
import SideMenu from './SideMenu';
import {Title, themeColor, bgColor} from "./api/config";

const Header = () => {
	const [visible, setVisible] = useState(false);
	const [customProps, setCustomProps] = useState({});
	const showBackButton = useSelector(state => state.header.showBackButton);
	const subTitle = useSelector(state => state.header.subTitle);

	const showDrawer = () => setVisible(true);
	const hideDrawer = () => setVisible(false);

	const {pathname} = useRouter();
	const selectedMenu = getMenuByPathName(pathname);
	const title = selectedMenu.subDetail ? selectedMenu.subDetail.title : selectedMenu.detail.title;

	// Update header's subtitle and back button state;
	useEffect(() => {
		let _customProps = {};
		if (showBackButton) {
			_customProps.onBack = () => Router.back();
		}
		if (subTitle) {
			_customProps.subTitle = subTitle;
		}
		setCustomProps(_customProps);
	}, [showBackButton, subTitle]);

	return (
			<header>
				<PageHeader title={title}
										style={{backgroundColor: themeColor, color: bgColor}}
										extra={<Button icon="menu" type="link" style={{color: bgColor, padding: '0', height: 'auto'}} onClick={showDrawer}/>}
										{...customProps}
				/>
				<Drawer
						title={(
								<a style={{verticalAlign: 'middle',marginLeft: '10px'}}
									 onClick={() => {
										hideDrawer();
										Router.push({pathname: '/'});
									}}>
									<Avatar shape="square" src="/static/icons/favicon-96x96.png" />
									<span style={{verticalAlign: 'middle'}}>{Title}</span>
								</a>
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