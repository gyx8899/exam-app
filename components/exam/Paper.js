import React, {useState} from 'react';
import {List, Empty} from 'antd';
import {useSelector} from "react-redux";
import Question from './Question';
import {getFilterData} from "../api/exam";
import {PaperPageSize} from '../api/config';

function Paper({paperIndex, examId}) {
	const library = useSelector(state => state.exam.library);
	const config = useSelector(state => state.exam.config);
	const [paper] = useState(library[examId].papers[paperIndex]);
	if (!paper) {
		return <Empty />;
	}
	return (
	<List
			bordered
			itemLayout="vertical"
			pagination={{
				position: 'bottom',
				showQuickJumper: true,
				pageSize: PaperPageSize,
				onChange: () => window.scrollTo({top: 0, behavior: "smooth" }),
			}}
			dataSource={getFilterData(config.visibilityFilter, paper.data)}
			renderItem={(item, index) => (
					<List.Item key={index}>
						<Question info={item} examId={examId} paperIndex={paperIndex}/>
					</List.Item>
			)}
	/>
	);
}
export default Paper