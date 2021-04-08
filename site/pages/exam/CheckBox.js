import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, Row, Col } from 'antd';
import { DO_EXERCISE } from '../../../site/stores/constants/exam';
import { isRightAnswer } from '../../util/exam';

function QCheckBox({ question, paperIndex, examId, exercise }) {
	const dispatch = useDispatch();
	const onChange = useCallback(
		(checkedValue) => {
			let qAnswer = checkedValue.sort();
			dispatch({
				type: DO_EXERCISE,
				qIndex: question.index,
				qAnswer,
				isRight: isRightAnswer(qAnswer, question.answer),
				paperIndex,
				examId,
			});
		},
		[question, paperIndex, examId]
	);
	return (
		<Checkbox.Group
			style={{ width: '100%' }}
			defaultValue={(exercise && exercise.answer) || []}
			onChange={onChange}
		>
			<Row>
				{question.options.map((item, index) => (
					<Col key={index}>
						<Checkbox value={index}>{item}</Checkbox>
					</Col>
				))}
			</Row>
		</Checkbox.Group>
	);
}

export default QCheckBox;
