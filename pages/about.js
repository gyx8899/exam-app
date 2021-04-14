import React from 'react';
import { Result, Button } from 'antd';

const About = () => {
	return (
		<Result
			status="success"
			title="谨此献给我亲爱的老婆-平平!"
			extra={
				<div>
					欢迎反馈：
					<a href="mailto:gyx8899@126.com">gyx8899@126.com</a>
				</div>
			}
		/>
	);
};

export default About;
