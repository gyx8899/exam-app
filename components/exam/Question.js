import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import Radio from './Radio';
import CheckBox from './CheckBox';
import {OptionsType} from '../../constants/ConstTypes';

const Question = ({info, examId, paperIndex}) => {
	const showAnswer = useSelector(state => state.exam.config.showAnswer);
	return (
			<Fragment>
				<div>{`${info.index}. ${info.title}`}</div>
				{info.type ? <CheckBox question={info} examId={examId} paperIndex={paperIndex}/> : <Radio question={info} examId={examId} paperIndex={paperIndex} />}
				{showAnswer && <div>{`答案：${info._answer.map(index => OptionsType[index]).join(', ')}`}</div>}
			</Fragment>
	);
};

export default Question