/***
 * getFileNameFromURL
 * @param {string} url
 * @returns {object} {name: '', simpleBaseName: '', extensionName: '', baseName: ''}
 */
function getFileNameFromURL(url) {
	let fileNameSplit = url.split('/').pop().split('#')[0].split('?')[0].split('.');
	return {
		name: fileNameSplit.join('.'),
		simpleBaseName: fileNameSplit[0],
		extensionName: fileNameSplit.length > 1 ? fileNameSplit[fileNameSplit.length - 1] : '',
		baseName: fileNameSplit.length > 1 ? fileNameSplit.splice(0, fileNameSplit.length - 1).join('.') : fileNameSplit[0],
	};
}

function getURLParamByName(name, url = location.url.search) {
	if (!!URLSearchParams) {
		getURLParamByName = (name, url) => {
			return new URLSearchParams(url).get(name);
		};
	} else if (!!URL) {
		getURLParamByName = (name, url) => {
			return new URL(url).searchParams.get(name);
		};
	} else {
		getURLParamByName = (name, url) => {
			const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			// 获取地址栏的查询参数字符串
			const search = url.indexOf('http') !== -1 ? url.split('?')[1] : url;
			if (search) {
				const r = decodeURIComponent(search.split('#')[0]).substring(1).match(reg);
				if (r) {
					return unescape(r[2]);
				}
			}
			return '';
		};
	}
	getURLParamByName(name, url);
}

/***
 * getUrlQueryParams
 * @param {string} url
 * @returns {object}
 */
function getUrlQueryParams(url) {
	let query = {},
			searchStr = url ? (url.indexOf('?') !== -1 ? url.split('?')[1] : '') : location.search.substring(1),
			queryParams = searchStr.split("#")[0].split("&");
	for (let i = 0; i < queryParams.length; i++) {
		let queryParam = queryParams[i].split("=");
		if (queryParam.length > 1) {
			query[queryParam[0]] = decodeURIComponent(queryParam[1]);
		}
	}
	return query;
}

/***
 * getQueryParamValue
 * @param param
 * @returns {*}
 */
function getQueryParamValue(param) {
	return getURLParamByName(param);
}

/***
 * getCurrentScript in Page
 * @param {string} scriptName
 * @returns {Element || null}
 */
function getCurrentScript(scriptName) {
	let allScripts = document.getElementsByTagName("script");

	if (scriptName) {
		for (let i = 0; i < allScripts.length; i++) {
			let script = allScripts.item(i);

			if (script.src && script.src.split('?')[0].match(scriptName)) {
				return script;
			}
		}
	} else {
		if (document.currentScript) {
			return document.currentScript;
		} else {
			return allScripts[allScripts.length - 1];
		}
	}
	return null;
}

/**
 * getCurrentScriptParameter
 * @return {Object}
 */
function getCurrentScriptParameter() {
	let currentScript = getCurrentScript(undefined);
	return currentScript ? getUrlQueryParams(currentScript.src) : {};
}

/***
 * getCurrentScriptPath in Page
 * @param {string} scriptName
 * @returns {null|string}
 */
function getCurrentScriptPath(scriptName) {
	let script = getCurrentScript(scriptName);
	return script ? script.src : '';
}

/***
 * getRootPath
 * @returns {string}
 */
function getRootPath() {
	let href = document.location.href,
			pathName = document.location.pathname,
			localhostPath = href.substring(0, href.indexOf(pathName)),
			projectName = pathName.substring(0, pathName.substr(1).lastIndexOf('/') + 1);
	return (localhostPath + projectName);
}

/**
 * getScriptName
 * Not support in IE
 * @return {*}
 */
function getScriptName() {
	let error = new Error()
			, source
			, lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/)
			, currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);

	if ((source = lastStackFrameRegex.exec(error.stack.trim())) && source[1] != "")
		return source[1];
	else if ((source = currentStackFrameRegex.exec(error.stack.trim())))
		return source[1];
	else if (error['fileName'] !== undefined)
		return error['fileName'];
}

/**
 * getCurrentScriptSrc
 * @return {string}
 */
function getCurrentScriptSrc() {
	var scripts = document.getElementsByTagName("script");
	return (document.currentScript || scripts[scripts.length - 1]).src;
}

/**
 * Check url is exist or not, callback with success state
 * @param url
 * @param callback
 * @param context
 */
function isExist(url, callback, context) {
	let link = document.createElement("link"),
			isSuccess = true;

	link.onerror = function () {
		isSuccess = false;
		callback && (context ? context[callback]() : callback(isSuccess));
	};
	if (link.readyState) {  //IE
		link.onreadystatechange = function () {
			if (link.readyState === "loaded" || link.readyState === "complete") {
				link.onreadystatechange = null;
				setTimeout(function () {
					isSuccess && callback && (context ? context[callback]() : callback(isSuccess));
				}, 0);
			}
		};
	} else {  //Others
		link.onload = function () {
			callback && (context ? context[callback]() : callback(isSuccess));
		};
	}

	link.href = url;
	// TODO: type and rel should be accord to with checked file
	link.type = 'text/css';
	link.rel = 'stylesheet';

	document.querySelector('head').appendChild(link);
}

function getQueryPramsString(url) {
	let query = '';
	if (!url) {
		query = window.location.search.substring(1);
	} else {
		let urlItems = url.split('?');
		query = urlItems.length ? urlItems[1] : '';
	}
	return query.split("&");
}

function removeUrlParam(url, param) {
	if (!!getQueryParamValue(param, url)) {
		let filteredParams = [],
				targetSearch = '';
		getQueryPramsString()
				.forEach((query) => {
					if (query.split('=')[0] !== param) {
						filteredParams.push(query);
					}
				});
		if (filteredParams.length) {
			targetSearch = `?` + filteredParams.join('&');
		}
		return url.split('?')[0] + targetSearch;
	}
	return url;
}

function removedLocationUrlParam(param) {
	let locationUrl = window.location.href,
			removedParamUrl = removeUrlParam(locationUrl, param);
	window.history.pushState({}, document.title, removedParamUrl);
}

export {
	getFileNameFromURL,
	getURLParamByName,
	getUrlQueryParams,
	getQueryParamValue,
	getCurrentScript,
	getCurrentScriptParameter,
	getCurrentScriptPath,
	getRootPath,
	getScriptName,
	getCurrentScriptSrc,
	isExist,
	removeUrlParam,
	removedLocationUrlParam,
}