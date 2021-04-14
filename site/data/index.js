import { convertJSON as exam201907 } from './tool/Exam-201907';
import { convertJSON as jinHuMao } from './tool/JinHuMao';
import { convertJSON as xiaoFangTiKu } from './tool/XiaoFangTiKu';
import { convertJSON as exam202008 } from './tool/Exam-20200819';
import { convertJSON as exam202104 } from './tool/Exam-202104';
import { convertJSON as exam202104SystemLedger } from './tool/Exam-202104';

let _examConfig = [
	{
		id: 'Exam-202104-SystemLedger',
		title: '202104-系统台账-试题',
		convertJSON: exam202104SystemLedger,
		isLatest: true,
	},
	{
		id: 'Exam-202104',
		title: '202104-月考-试题',
		convertJSON: exam202104,
		isLatest: true,
	},
	{
		id: 'Exam-20200819-1',
		title: '202008-月考-试题-1',
		convertJSON: exam202008,
	},
	{
		id: 'Exam-20200819-2',
		title: '202008-月考-试题-2',
		convertJSON: exam202008,
	},
	{
		id: 'Exam-201907',
		title: '201907-月考-试题',
		convertJSON: exam201907,
	},
	{
		id: 'JinHuMao',
		title: '金护帽专题',
		list: [
			{
				id: 'JinHuMao-A-4850',
				title: '金护帽 - A 类题',
				convertJSON: jinHuMao,
			},
			{
				id: 'JinHuMao-B-3000',
				title: '金护帽 - B 类题',
				convertJSON: jinHuMao,
			},
			{
				id: 'JinHuMao-C-650',
				title: '金护帽 - C 类题',
				convertJSON: jinHuMao,
			},
			{
				id: 'JinHuMao-D-700',
				title: '金护帽 - D 类题',
				convertJSON: jinHuMao,
			},
			{
				id: 'JinHuMao-E-800',
				title: '金护帽 - E 类题',
				convertJSON: jinHuMao,
			},
		],
	},
	{
		id: 'XiaoFangTiKu',
		title: '消防测试题库',
		convertJSON: xiaoFangTiKu,
	},
];

// Add index
_examConfig = _examConfig.map((exam, index) => ({
	...exam,
	index,
}));

export const libraryJSONPath = '/static/data/library/';

export const examConfig = _examConfig;

export const getConfigById = function _getConfigById(configs, id) {
	let config = null;
	for (let i = 0, li = configs.length; i < li; i++) {
		if (configs[i].id === id) {
			config = configs[i];
			break;
		} else if (configs[i].list && configs[i].list.length) {
			let _config = _getConfigById(configs[i].list, id);
			if (!!_config) {
				config = _config;
				break;
			}
		}
	}
	return config;
};
