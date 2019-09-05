import {OptionsType, isRightType} from '../../../components/api/config';

/**
 * From:
 * {
			"name": "判断题",
			"data": [
			[
				"序号",
				"难度",
				"类型",
				"题目",
				"答案",
				"选项1",
				"选项2",
				"选项3",
				"选项4",
				"选项5"
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
				_answer: [1, 2, 3],
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
					difficulty: item[1],
					type: item[2] === '多选题',
					title: item[3],
					_answer: (typeof item[4] === 'number') ? [item[4] - 1] : item[4].replace(/，/g, ',').split(',').map(value => value - 1),
					answer: [],
					isRight: isRightType.INIT,
					options: item.slice(5).map((option, index) => `${OptionsType[index]}. ${option}`)
				});
			}
		}
		convertedData.push(targetData);
	}

	return convertedData;
}