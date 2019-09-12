//
let fs = require('fs');

//Util
function writeDataToFile(fileDirName, data)
{
	fs.writeFile(fileDirName, data, function (err) {
		console.log(fileDirName + ': ' + (err ? 'Write File failed!' : 'Saved successfully!'));
	});
}

function readDataFromFile(fileDirname)
{
	return fs.readFileSync(fileDirname).toString();
}

function getDirectoryList(directory)
{
	let dirContent = {dirNames: [], fileNames: []};
	fs.readdirSync(directory)
			.forEach(function (dirItem) {
				if (fs.statSync(directory + "/" + dirItem).isDirectory())
				{
					dirContent.dirNames[dirContent.dirNames.length] = dirItem;
				}
				else
				{
					dirContent.fileNames[dirContent.fileNames.length] = dirItem;
				}
			});
	return dirContent;
}

function getDirectoryFileNames(path)
{
	return getDirectoryList(path).fileNames;
}

function getDirectoryFolderNames(path)
{
	return getDirectoryList(path).dirNames;
}

function getNodeArgs() {
	const args = {};
	process.argv
			.slice(2, process.argv.length)
			.forEach(arg => {
				// long arg
				if (arg.slice(0, 2) === '--') {
					const longArg = arg.split('=');
					const longArgFlag = longArg[0].slice(2, longArg[0].length);
					args[longArgFlag] = longArg.length > 1 ? longArg[1] : true;
				}
				// flags
				else if (arg[0] === '-') {
					const flags = arg.slice(1, arg.length).split('');
					flags.forEach(flag => {
						args[flag] = true;
					});
				}
			});
	return args;
}

function getNameFromFileName(fileName) {
	return fileName.slice(0, fileName.lastIndexOf('.'));
}

function getDiffFolderFileNames(sourceFolder, destFolder) {
	let sourceFileNames = getDirectoryFileNames(sourceFolder),
			destFileNames = getDirectoryFileNames(destFolder),
			destFileMap = {},
			resultFileNames = [];
	for (let i = 0; i < destFileNames.length; i++) {
		destFileMap[getNameFromFileName(destFileNames[i])] = destFileNames[i];
	}
	for (let i = 0; i < sourceFileNames.length; i++) {
		if (!destFileMap[getNameFromFileName(sourceFileNames[i])]) {
			resultFileNames.push(sourceFileNames[i]);
		}
	}
	return resultFileNames;
}

module.exports = {
	writeDataToFile,
	readDataFromFile,
	getDirectoryList,
	getDirectoryFileNames,
	getDirectoryFolderNames,
	getNodeArgs,
	getDiffFolderFileNames
};