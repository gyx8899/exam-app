import React, {Fragment, useEffect} from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import {BackTop, message} from "antd";
import useOffline from "../util/UseOffline";
import {initialize, pageview} from "react-ga";
import {GA_TRACKING_ID, Title, bgColor} from "../config/index";
import Router from "next/router";

import '../styles/page.less';

const Layout = ({title, children}) => {
	// Offline status
	const [isOffline, isReOnline] = useOffline();
	useEffect(() => {
		isOffline && message.warning('网络已断开');
	}, [isOffline]);
	useEffect(() => {
		isReOnline && message.success('网络已重新连接');
	}, [isReOnline]);

	// Google Analytics - page track
	const trackPage = page => pageview(page);
	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', GA_TRACKING_ID);

		initialize(GA_TRACKING_ID);
		trackPage(window.location.pathname + window.location.search);

		Router.events.on('routeChangeComplete', trackPage);

		return () => {
			Router.events.off('routeChangeComplete', trackPage);
		}
	}, []);

	return (
			<Fragment>
				<Head>
					{title && <title>{`${title} - ${Title}`}</title>}
				</Head>
				<Header title={title} />
				<main>
					{children}
				</main>
				<Footer/>
				<BackTop/>
			</Fragment>
	)
};
export default Layout;