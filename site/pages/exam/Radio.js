import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Radio} from 'antd';
import {DO_EXERCISE} from "../../../site/stores/constants/exam";

export default function QRadio({question, paperIndex, examId}) {
	const dispatch = useDispatch();
	const onChange = useCallback((e) => {
		dispatch({
			type: DO_EXERCISE,
			qIndex: question.index,
			qAnswer: [e.target.value],
			paperIndex,
			examId
		});
	}, [question, paperIndex, examId]);
	let options = question.options.map((option, index) => ({label: option, value: index}));
	let otherProps = {};
	if (question.answer.length) {
		otherProps.defaultValue = question.answer[0];
	}
	return <Radio.Group options={options} onChange={onChange} {...otherProps} />;
}