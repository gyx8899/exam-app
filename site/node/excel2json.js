// required
let util = require('../../app/node/util.js');
let path = require("path");
let xlsx2json = require("node-xlsx");// npm install --save-dev node-xlsx

const args = util.getNodeArgs();

let excelPath = path.join(__dirname, "../data/excel/"),
		jsonPath = path.join(__dirname, "../../static/data/library/"),
		fileNames = args.name ? [args.name] : util.getDiffFolderFileNames(excelPath, jsonPath);

for (let fileName of fileNames)
{
	let fileNameSplit = fileName.split('.'),
			jsonFileName = fileName.replace(fileNameSplit[fileNameSplit.length - 1], 'json'),
			jsonFileDirName = path.join(jsonPath, jsonFileName),
			excelFileDirName = path.join(excelPath, fileName),
			jsonData = JSON.stringify(xlsx2json.parse(excelFileDirName));
	util.writeDataToFile(jsonFileDirName, jsonData);
}




