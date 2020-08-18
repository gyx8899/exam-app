import {OptionsType} from '../../../app/config';

/**
 * From:
 * {
			"name": "判断题",
			"data": [
			[
				"序号",
        "题型",
        "题干"
			]
 		]
 }
 * To:
 * {
		"name": "判断题",
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
 * @param json
 * @return {Array}
 */
export function convertJSON(json) {
	let convertedData = [];
	for (let i = 0, li = json.length; i < li; i++) {
		let sourceData = json[i];
		let targetData = {
			name: sourceData.name,
			data: []
		};
		for (let j = 1, lj = sourceData.data.length; j < lj; j++) {
			let item = sourceData.data[j];
			if (item.length) {
				targetData.data.push({
					index: item[0],
					difficulty: null,
					type: item[1] === '多选题',
					title: item[2],
					answer: [],
					options: item[3] ? [item[3]] : [],
				});
			}
		}
		convertedData.push(targetData);
	}

	return convertedData;
}