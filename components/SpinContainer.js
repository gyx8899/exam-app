import React from 'react';
import {Spin} from "antd";

const SpinContainer = ({children, loading}) => {
	return (
			<Spin spinning={loading} delay={500}>
				{children}
			</Spin>
	);
};

export default SpinContainer