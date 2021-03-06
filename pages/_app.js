import React, {Fragment} from 'react';
import App from "next/app";
import Head from "next/head";
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../app/stores/store';
import Layout from '../app/components/Layout';
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import PageLoading from "../app/components/PageLoading";
import {ConfigProvider} from "antd";
import {Title, MetaDescription, MetaKeyWord, MetaAuthor, PageTitle, GA_TRACKING_ID, projectColor} from "../app/config/index";

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
						<title>{Title}</title>
						<meta name='viewport' content='width=device-width, initial-scale=1'/>
						<meta charSet='utf-8'/>
						<meta name="description" content={MetaDescription}/>
						<meta name="keywords" content={MetaKeyWord}/>
						<meta name="author" content={MetaAuthor}/>
						<link rel='shortcut icon' href='/static/icons/favicon.ico' type='image/ico'/>
						<link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180x180.png"/>
						<link rel="icon" type="image/png" sizes="96x96" href="/static/icons/favicon-96x96.png"/>
						<link rel="manifest" href="/static/manifest.json"/>
						<meta name="msapplication-TileColor" content={projectColor}/>
						<meta name="msapplication-TileImage" content="/static/icons/ms-icon-144x144.png"/>
						<meta name="msapplication-config" content="/static/browserconfig.xml"/>
						{/*{<!-- Status Bar Style -->}*/}
						{/*{<!-- Safari: black, black-translucent -->}*/}
						<meta name="apple-mobile-web-app-status-bar-style" content="yes"/>
						{/*{<!-- Chrome, Firefox OS and Opera -->}*/}
						<meta name="theme-color" content={projectColor}/>
						{
							GA_TRACKING_ID && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
						}
					</Head>
					<ConfigProvider>
						<Provider store={store}>
							<PersistGate persistor={persistor} loading={<PageLoading/>}>
								<Layout title={PageTitle[router.pathname]}>
									<Component {...pageProps} router={router}/>
								</Layout>
							</PersistGate>
						</Provider>
					</ConfigProvider>
				</Fragment>
		);
	}
}

// export default withRedux(createStore)(withReduxSaga({ async: true })(NextApp));
export default withRedux(createStore)(NextApp);
// export default NextApp;