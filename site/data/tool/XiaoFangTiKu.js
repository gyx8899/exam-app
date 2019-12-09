import {OptionsType} from '../../../app/config';

/**
 * From:
 * {
			"name": "消防测试题库",
			"data": [
			[
				"序号",
				"题目",
				"选项A",
				"选项B",
				"选项C",
				"选项D",
				"答案"
			],
 		]
 }
 * To:
 * {
		"name": "消防测试题库",
		"data": [
			{
				index: 1, // 0, 1, 2, ...
				difficulty: null,
				type: true, // true or false, 即单选或多选
				title: '题目标题',
				answer: [1, 2, 3],
				options: ['A. xxx', 'B. xxx', 'C. xxx', 'D. xxx'],
				answer: [],
			}
		]
  }
 */
const getDataIndex = (json, index) => {
	const data = json[index].data;
	if (!data || data.length === 0) {
		return;
	}
	const tableHeader = data[1];
	return {
		index: tableHeader.findIndex(item => (item === '序号' || item === null)),
		difficulty: null,
		type: json[index].name === '多选',
		title: tableHeader.findIndex(item => item === '题目'),
		answer: tableHeader.findIndex(item => item === '答案'),
		options: tableHeader.map((item, index) => (item && item.includes('题目')) ? index : null).filter(item => item !== null),
	};
};

/**
 *
 * @param json
 * @return {Array}
 */
export function convertJSON(json) {
	let convertedData = [];
	for (let i = 0, li = json.length; i < li; i++) {
		let dataIndex = getDataIndex(json, i);
		if (!dataIndex) {
			continue;
		}
		let sourceData = json[i];
		let targetData = {
			name: sourceData.name,
			data: []
		};
		for (let j = 2, lj = sourceData.data.length; j < lj; j++) {
			let item = sourceData.data[j];
			if (item.length) {
				let title = item[dataIndex.title].split('A.')[0];
				targetData.data.push({
					index: item[dataIndex.index] * 1,
					difficulty: null,
					type: dataIndex.type,
					title: title,
					answer: item[dataIndex.answer].split('').map(value => value.charCodeAt() - 65),
					options: item[dataIndex.title].slice(item[dataIndex.title].indexOf('A.'))
							.replace(/\n/g, ' ')
							.replace('A.', ' ')
							.replace('B.', ' ')
							.replace('C.', ' ')
							.replace('D.', ' ')
							.split(' ')
							.filter(_item => {
								return !!_item
							})
							.map((content, index) => {
								let _option = content.trim().replace(`${OptionsType[index]}.`, ''),
										option = `${OptionsType[index]}. ${_option}`;
								if (typeof _option === 'number' && !isNaN(_option) && _option > 10000) {
									let optionDate = new Date(1899, 12, _option - 1);
									option = `${optionDate.getFullYear()}年${optionDate.getMonth() + 1}月${optionDate.getDate()}日`;
								}
								return option;
							})
				});
			}
		}
		convertedData.push(targetData);
	}

	return convertedData;
}