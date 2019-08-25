import React from 'react';
import {Spin} from "antd";

const PageLoading = () => (
		<React.Fragment>
			<style jsx>{`
				.center-in-screen {
					position: fixed;
					top: 50%;
					bottom: auto;
					left: 50%;
					right: auto;
					-webkit-transform: translate(-50%, -50%);
					transform: translate(-50%, -50%);
				}
			`}</style>
			<div className="center-in-screen">
				<Spin tip="Loading..." size="large"/>
			</div>
		</React.Fragment>
);

export default PageLoading