# 考试 A+ 助手

Tags:  Exam, App

一款基于 Next.js 的 考试 A+ 助手应用，通过使用 excel 文件形式的考题文件，转换成 JSON 数据，展现在考题页面，形成一个供用户练习考题的应用。

[考试 A+ 助手 - https://exam-app.katekuo.now.sh/](https://exam-app.katekuo.now.sh/) 

### 特点
- [x] React(Hook) + Next.js + Redux
- [ ] PWA
- [x] On/Offline Tip
- [x] Google Analytics
- [x] Exercise Data persist
- [x] Share
- [x] NextJS server render


### 采坑系列

* Antd 的 Radio 组件文字显示，默认不支持换行；
		
	*解决：css override*
	```css
	.ant-radio-wrapper {
		white-space: normal;
	}
	```

* Excel 文件经过转换 JSON 数据格式中，Date 日期类数据会被转换成起始于1899年11月30日之后的天数；
		
	> [Excel 认为1900年是闰年的bug][1] 转换成常规值后会多一天
	
	*解决： 对转后的 JSON 数据再处理，当发现字段数据为数字且大于10000，转换为xxxx年xx月xx日*
	```javascript
	let _option = 432543; // Test fake number
	if (typeof _option === 'number' && !isNaN(_option) && _option > 10000) {
		let optionDate = new Date(1899, 12, _option - 1);
		option = `${optionDate.getFullYear()}年${optionDate.getMonth() + 1}月${optionDate.getDate()}日`;
	}
	return option;
	```

[1]: https://answers.microsoft.com/zh-hans/msoffice/forum/all/excel/8f981368-1323-454e-8e6b-24d21f033634 "Excel 认为1900年是闰年的bug"