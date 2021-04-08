import React, { useState } from 'react';
import { List, Empty } from 'antd';
import { useSelector } from 'react-redux';
import Question from './Question';
import { getFilterData } from '../../util/exam';
import { PaperPageSize } from '../../../app/config';

import './Paper.less';

function Paper({ paperIndex, examId }) {
	const library = useSelector((state) => state.exam.library);
	const [paper] = useState(library[examId].papers[paperIndex]);
	if (!paper) {
		return <Empty />;
	}
	const user = useSelector((state) => state.exam.user);
	const config = useSelector((state) => state.exam.config);
	const [exercise] = useState(user[examId][paperIndex]);
	return (
		<List
			bordered
			itemLayout="vertical"
			pagination={{
				position: 'bottom',
				showQuickJumper: true,
				pageSize: PaperPageSize,
				onChange: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
			}}
			dataSource={getFilterData(
				config.visibilityFilter,
				paper.data,
				exercise
			)}
			renderItem={(item, index) => (
				<List.Item key={index}>
					<Question
						info={item}
						examId={examId}
						paperIndex={paperIndex}
						exercise={exercise[item.index]}
					/>
				</List.Item>
			)}
		/>
	);
}
export default Paper;
