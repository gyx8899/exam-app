import React, {useState} from "react";
import {Button, PageHeader, Drawer, Avatar} from "antd";
import {useRouter} from "next/router";
import {getMenuByPathName} from "./api/config";
import {useSelector} from "react-redux";
import SideMenu from './SideMenu';

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
						title={<Avatar shape="square" src="/static/icons/favicon-32x32.png" />}
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