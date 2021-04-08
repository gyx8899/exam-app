import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Radio } from 'antd';
import { DO_EXERCISE } from '../../../site/stores/constants/exam';
import { isRightAnswer } from '../../util/exam';

import './Radio.less';

export default function QRadio({ question, paperIndex, examId, exercise }) {
	const dispatch = useDispatch();
	const onChange = useCallback(
		(e) => {
			dispatch({
				type: DO_EXERCISE,
				qIndex: question.index,
				qAnswer: [e.target.value],
				isRight: isRightAnswer([e.target.value], question.answer),
				paperIndex,
				examId,
			});
		},
		[question, paperIndex, examId]
	);
	let options = question.options.map((option, index) => ({
		label: option,
		value: index,
	}));
	let otherProps = {};
	if (exercise && exercise.answer && exercise.answer.length) {
		otherProps.defaultValue = exercise.answer[0];
	}
	return (
		<Radio.Group options={options} onChange={onChange} {...otherProps} />
	);
}
