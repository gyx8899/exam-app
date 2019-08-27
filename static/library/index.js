import {convertJSON} from './tool/Exam-201907';

let examConfig = [
	{
		id: 'Exam-201907',
		title: '月考-201907',
		convertJSON
	},
	{
		id: 'Exam-201907',
		title: '月考-201908',
		convertJSON
	},
	{
		id: 'Exam-201907',
		title: '月考-201909',
		convertJSON
	}
];

// Add index
examConfig = examConfig.map((exam, index) => ({
	...exam,
	index
}));

export default examConfig