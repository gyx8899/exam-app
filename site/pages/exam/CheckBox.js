import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Checkbox, Row, Col} from 'antd';
import {DO_EXERCISE} from "../../../redux/constants/exam";

function getSpanValue(count) {
	const config = {
		1: 24,
		2: 12,
		3: 8,
		4: 6,
		5: 24
	};
	return config[count];
}

function QCheckBox({question, paperIndex, examId}) {
	const dispatch = useDispatch();
	const onChange = useCallback((checkedValue) => {
		dispatch({
			type: DO_EXERCISE,
			qIndex: question.index,
			qAnswer: checkedValue.sort(),
			paperIndex,
			examId
		});
	}, [question, paperIndex, examId]);
	const span = getSpanValue(question.options);
	return (
			<Checkbox.Group style={{width: '100%'}} defaultValue={question.answer} onChange={onChange}>
				<Row>
					{
						question.options.map((item, index) => (
								<Col span={span} key={index}>
									<Checkbox value={index}>{item}</Checkbox>
								</Col>
						))
					}
				</Row>
			</Checkbox.Group>
	);
}

export default QCheckBox