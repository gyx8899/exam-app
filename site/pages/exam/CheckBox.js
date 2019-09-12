import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Checkbox, Row, Col} from 'antd';
import {DO_EXERCISE} from "../../../site/stores/constants/exam";

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
	return (
			<Checkbox.Group style={{width: '100%'}} defaultValue={question.answer} onChange={onChange}>
				<Row>
					{
						question.options.map((item, index) => (
								<Col key={index}>
									<Checkbox value={index}>{item}</Checkbox>
								</Col>
						))
					}
				</Row>
			</Checkbox.Group>
	);
}

export default QCheckBox