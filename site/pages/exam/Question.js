import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Radio from './Radio';
import CheckBox from './CheckBox';
import { OptionsType } from '../../../app/config/index';
import { visibilityFilters } from '../../stores/constants/exam';

const Question = ({ info, examId, paperIndex, exercise }) => {
	const showAnswer = useSelector((state) => state.exam.config.showAnswer);
	const visibilityFilter = useSelector(
		(state) => state.exam.config.visibilityFilter
	);
	return (
		<Fragment>
			<div>{`${info.index}. ${info.title}`}</div>
			{info.type ? (
				<CheckBox
					key={info.index}
					question={info}
					examId={examId}
					paperIndex={paperIndex}
					exercise={exercise}
				/>
			) : (
				<Radio
					key={info.index}
					question={info}
					examId={examId}
					paperIndex={paperIndex}
					exercise={exercise}
				/>
			)}
			{(showAnswer ||
				visibilityFilter === visibilityFilters.SHOW_WRONG) && (
				<div>{`答案：${info.answer
					.map((index) => OptionsType[index])
					.join(', ')}`}</div>
			)}
		</Fragment>
	);
};

export default Question;
