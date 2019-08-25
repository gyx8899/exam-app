import React, {Fragment} from 'react';
import App, {Container} from "next/app";
import Head from "next/head";
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layout from '../components/Layout';
import {RouterTitle} from "../constants/ConstTypes";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import PageLoading from "../components/PageLoading";
import {ConfigProvider, BackTop} from "antd";

class NextApp extends App {

	static async getInitialProps({Component, ctx}) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps({ctx});
		}

		return {pageProps};
	}

	render() {
		const {Component, pageProps, store, router} = this.props;
		let persistor = persistStore(store);
		return (
				<Fragment>
					<Head>
						<title>Exam application</title>
						<meta name='viewport' content='width=device-width, initial-scale=1'/>
						<meta charSet='utf-8'/>
						<meta name="description" content=""/>
						<meta name="keywords" content="Exam app"/>
						<meta name="author" content="Steper Kuo"/>
						<link rel='shortcut icon' href='/static/icons/favicon.ico' type='image/ico'/>
						<link rel="apple-touch-icon" sizes="57x57" href="/static/icons/apple-icon-57x57.png"/>
						<link rel="apple-touch-icon" sizes="60x60" href="/static/icons/apple-icon-60x60.png"/>
						<link rel="apple-touch-icon" sizes="72x72" href="/static/icons/apple-icon-72x72.png"/>
						<link rel="apple-touch-icon" sizes="76x76" href="/static/icons/apple-icon-76x76.png"/>
						<link rel="apple-touch-icon" sizes="114x114" href="/static/icons/apple-icon-114x114.png"/>
						<link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-icon-120x120.png"/>
						<link rel="apple-touch-icon" sizes="144x144" href="/static/icons/apple-icon-144x144.png"/>
						<link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple-icon-152x152.png"/>
						<link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180x180.png"/>
						<link rel="icon" type="image/png" sizes="192x192" href="/static/icons/android-icon-192x192.png"/>
						<link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png"/>
						<link rel="icon" type="image/png" sizes="96x96" href="/static/icons/favicon-96x96.png"/>
						<link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png"/>
						<link rel="manifest" href="/static/manifest.json"/>
						<meta name="msapplication-TileColor" content="#1890FF"/>
						<meta name="msapplication-TileImage" content="/static/icons/ms-icon-144x144.png"/>
						<meta name="msapplication-config" content="/static/browserconfig.xml"/>
						<meta name="theme-color" content="#1890FF"/>
					</Head>
					<Container>
						<ConfigProvider>
							<Provider store={store}>
								<PersistGate persistor={persistor} loading={<PageLoading/>}>
									<Layout title={RouterTitle[router.pathname]}>
										<Component {...pageProps} router={router}/>
										<BackTop/>
									</Layout>
								</PersistGate>
							</Provider>
						</ConfigProvider>
					</Container>
				</Fragment>
		);
	}
}

// export default withRedux(createStore)(withReduxSaga({ async: true })(NextApp));
export default withRedux(createStore)(NextApp);
// export default NextApp;