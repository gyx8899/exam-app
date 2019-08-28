import React, {Fragment, useEffect} from 'react';
import {initialize, pageview} from 'react-ga';
import Router from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import {BackTop, message} from "antd";
import useOffline from "./api/UseOffline";
import {GAId} from "./api/config";

const Layout = ({title, children}) => {
	// Offline status
	const [isOffline, isReOnline] = useOffline();
	useEffect(() => {
		isOffline && message.warning('网络已断开');
	}, [isOffline]);
	useEffect(() => {
		isReOnline && message.success('网络已重新连接');
	}, [isReOnline]);

	// React GA page track
	useEffect(() => {
		initialize(GAId);
		pageview(window.location.pathname + window.location.search);

		const handleRouteChange = url => pageview(url);

		Router.events.on('routeChangeComplete', handleRouteChange);
		Router.events.on('hashChangeComplete', handleRouteChange);

		return () => {
			Router.events.off('routeChangeComplete', handleRouteChange);
			Router.events.off('hashChangeComplete', handleRouteChange);
		}
	}, []);

	return (
			<Fragment>
				<Head>
					{title && <title>{title}</title>}
				</Head>
				<style jsx global>{`
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					html {
						height: 100%;
					}
					body {
						font-family: Arial, sans-serif;
						display: flex;
						flex-direction: column;
						flex-flow: column; 
						min-height: 100vh; 
						overflow:auto;
					}
					.ant-list-bordered {
						border: none;
					}
					.ant-switch {
						margin: 0 15px;
					}
				`}</style>
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