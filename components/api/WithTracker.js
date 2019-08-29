import React, {useEffect} from "react";
import {initialize, set, pageview} from "react-ga";
import {GA_TRACKING_ID} from './config';
import Router from "next/router";

export const withTracker = (WrappedComponent, options = {}) => {
	const trackPage = page => {
		set({
			page,
			...options
		});
		pageview(page);
	};

	return props => {

		useEffect(() => {
			initialize(GA_TRACKING_ID);
			trackPage(window.location.pathname + window.location.search);

			Router.events.on('routeChangeComplete', trackPage);

			return () => {
				Router.events.off('routeChangeComplete', trackPage);
			}
		}, []);

		return <WrappedComponent {...props} />;
	};
};