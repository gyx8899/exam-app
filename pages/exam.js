import React from 'react';
import { useRouter } from 'next/router';
import ExamList from '../site/pages/exam/ExamList';
import PaperContainer from '../site/pages/exam/PaperContainer';
import { useSelector } from 'react-redux';

const Exam = () => {
	const router = useRouter();
	const examId = router.query.id;
	const library = useSelector((state) => state.exam.library);
	if (examId && library[examId] && library[examId].papers) {
		return <PaperContainer />;
	} else {
		return <ExamList />;
	}
};

export default Exam;
