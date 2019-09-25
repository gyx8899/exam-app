import {getFileNameFromURL} from "./URL";
import {parameterArrayToItem} from "./Tool";

/***
 * getUrlTypeInfo
 * @param {string} url
 * @returns {object}
 */
function getUrlTypeInfo(url) {
	// Current only support js and css resources;
	let fileExtensionName = getFileNameFromURL(url).extensionName;
	if (fileExtensionName) {
		let urlType = {
			'js': {
				name: 'js',
				tagName: 'script',
				urlAttrName: 'src',
				loadFn: loadScript,
				loadFnPromise: loadScriptWithPromise
			},
			'css': {
				name: 'css',
				tagName: 'link',
				urlAttrName: 'href',
				loadFn: loadCSS,
				loadFnPromise: loadCSSWithPromise
			}
		};
		return urlType[fileExtensionName];
	}
	return null;
}

/***
 * loadScript
 * @param {(string)} url string of url
 * @param {function} [callback] - callback() after script loaded
 * @param {object} [context] - callback's context
 * @param {object} info - {isAsync: [true/false], attributes: {}, libName: ""}
 */
function loadScript(url, callback, context, info) {
	if (!url)
		return;

	if (Array.isArray(url)) {
		// Process the url and callback if they are array;
		parameterArrayToItem(function (urlParam, callbackParam) {
			loadScript(urlParam, callbackParam, context, info);
		}, url, callback);
	} else {
		let script = document.createElement("script"),
				isSuccess = true,
				libName = info && info['libName'] ? info['libName'] : getFileNameFromURL(url).name;
		script.type = "text/javascript";
		info && info['isAsync'] && script.setAttribute('async', '');

		if (info && info.attributes) {
			for (let attr in info.attributes) {
				if (info.attributes.hasOwnProperty(attr)) {
					script.setAttribute(attr, info.attributes[attr]);
					attr === 'class' && script.setAttribute('className', info.attributes[attr]);
				}
			}
		}

		script.onerror = function () {
			isSuccess = false;
			callback && (context ? context[callback]() : callback(isSuccess));
		};
		if (script.readyState) {  //IE
			script.onreadystatechange = function () {
				if (script.readyState === "loaded" || script.readyState === "complete") {
					script.onreadystatechange = null;
					setTimeout(function () {
						isSuccess && callback && (context ? context[callback]() : callback(isSuccess));
					}, 0);
				}
			};
		} else {  //Others
			script.onload = function () {
				callback && (context ? context[callback]() : callback(isSuccess));
			};
		}

		script.src = url;

		document.body.appendChild(document.createComment(" Script " + libName + " *** JS "));
		document.body.appendChild(script);
	}
}

/***
 * loadScript with Promise
 * @param url
 * @returns {Promise}
 */
function loadScriptWithPromise(url, type) {
	return new Promise(function (resolve, reject) {
		if (!url) {
			reject(new Error("url is null!"));
		}
		if (checkResourceLoaded(url)) {
			resolve(true);
		}

		let script = document.createElement("script"),
				isSuccess = true;
		script.type = type ? type : "text/javascript";

		script.onerror = function () {
			isSuccess = false;
			reject();
		};
		if (script.readyState) {  //IE
			script.onreadystatechange = function () {
				if (script.readyState === "loaded" || script.readyState === "complete") {
					script.onreadystatechange = null;
					setTimeout(function () {
						resolve(true);
					}, 0);
				}
			};
		} else {  //Others
			script.onload = function () {
				resolve(true);
			};
		}

		script.src = url;

		document.body.appendChild(document.createComment(" Script " + getFileNameFromURL(url).name + " *** JS "));
		document.body.appendChild(script);
	});
}

/***
 * loadCSS
 * @param {(string|string[])} url string or an array of urls
 * @param {function} [callback] - callback() after script loaded
 * @param {object} [context] - callback's context
 */
function loadCSS(url, callback, context) {
	if (!url)
		return;

	if (Array.isArray(url)) {
		// Process the url and callback if they are array;
		parameterArrayToItem(function (urlParam, callbackParam) {
			loadCSS(urlParam, callbackParam);
		}, url, callback);
	} else {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		link.onload = function () {
			callback && (context ? context[callback]() : callback());
		};
		link.onerror = function () {
			console.log("Error load css:" + url);
		};

		document.getElementsByTagName('head')[0].appendChild(document.createComment(" Style " + getFileNameFromURL(url).name + " *** CSS "));
		document.getElementsByTagName('head')[0].appendChild(link);
	}
}

/***
 * loadCSS with Promise
 * @param url
 * @returns {Promise}
 */
function loadCSSWithPromise(url) {
	return new Promise(function (resolve, reject) {
		if (!url) {
			reject(new Error("url is null!"));
		}
		if (checkResourceLoaded(url)) {
			resolve(true);
		}

		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		link.onload = function () {
			resolve(true);
		};
		link.onerror = function (error) {
			reject(new Error(error));
		};

		document.getElementsByTagName('head')[0].appendChild(document.createComment(" Style " + getFileNameFromURL(url).name + " *** CSS "));
		document.getElementsByTagName('head')[0].appendChild(link);
	});
}

/***
 * Load resource: support url types - js, css
 * @param {string} url
 * @param {function} [callback] - callback() after resource loaded
 */
function loadResource(url, callback) {
	if (!checkResourceLoaded(url)) {
		getUrlTypeInfo(url).loadFn.call(this, url, callback);
	} else {
		callback && callback();
	}
}

/***
 * loadResources: support url, js, css
 * @param {string[]} urls - an array of urls
 * @param {function} [callback] - callback() after url loaded
 */
function loadResources(urls, callback) {
	if (urls !== null && urls !== '') {
		if (Array.isArray(urls)) {
			urls = urls.filter(function (url) {
				return (String(url) === url && url !== '');
			});
			if (urls.length === 0) {
				callback && callback();
			} else if (urls.length === 1) {
				loadResource(urls[0], callback);
			} else {
				if (callback) {
					loadUrls(urls, callback);
				} else {
					urls.map(function (url) {
						loadResource(url);
					})
				}
			}
		} else if (String(urls) === urls) {
			loadResource(urls, callback);
		}
	} else {
		callback && callback();
	}
}

/***
 * checkResourceLoaded
 * @param {string} url
 * @returns {boolean}
 */
function checkResourceLoaded(url) {
	let type = getUrlTypeInfo(url),
			typeSelector = type['tagName'] || '[src]',
			allUrls = Array.prototype.slice.call(document.querySelectorAll(typeSelector))
					.map(function (scriptElement) {
						return scriptElement[type['urlAttrName']];
					});
	return allUrls.indexOf(url) !== -1;
}

/***
 * loadUrls with Promise if it is supported
 * @param {string[]} urls - an array of urls
 * @param {function} [callback] - callback() after url loaded
 */
function loadUrls(urls, callback) {
	let unLoadedResourcesInfo = urls.filter(function (url) {
		return !checkResourceLoaded(url);
	}).map(function (resource) {
		let resourceInfo = getUrlTypeInfo(resource);
		resourceInfo.url = resource;
		return resourceInfo;
	});
	// If support Promise, use Promise
	if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
		let resourcePromise = unLoadedResourcesInfo.map(function (resourceInfo) {
			return resourceInfo.loadFnPromise.call(this, resourceInfo.url);
		});
		Promise.all(resourcePromise).then(function () {
			callback && callback();
		}).catch(function (error) {
			console.log("Error: in load resources! " + error);
		});
	} else {
		unLoadedResourcesInfo.forEach(function (resourceInfo) {
			resourceInfo.loadFn.call(this, resourceInfo.url);
		});
		callback && callback();
	}
}

/***
 * Use XDomainRequest when browser <= IE9, otherwise use XMLHttpRequest(not support < IE9);
 * @param {string} url
 * @param {function} callback
 * @param {object} context: callback's context
 */
function getFileContent(url, callback, context) {
	if (document.documentMode <= 9 && window.XDomainRequest) {
		xdrGetRequest(url, callback, context)
	} else {
		xmlHTTPGetRequest(url, callback, context);
	}

	/***
	 * xdrGetRequest: send get request in IE <= 9
	 * @param {string} url
	 * @param {function} callback
	 * @param {object} context: callback's context
	 *
	 * XDomainRequest is an implementation of HTTP access control (CORS) that worked in Internet Explorer 8 and 9.
	 * It was removed in Internet Explorer 10 in favor of using XMLHttpRequest with proper CORS;
	 * https://developer.mozilla.org/zh-CN/docs/Web/API/XDomainRequest
	 */
	function xdrGetRequest(url, callback, context) {
		let xdr = new XDomainRequest();
		if (xdr) {
			xdr.onload = function () {
				callback && (context ? context[callback](xdr.responseText) : callback(xdr.responseText));
			};
			xdr.onerror = function () {
				/* error handling here */
			};
			xdr.open('GET', url);
			xdr.send();
		}
	}

	/***
	 * XMLHttpRequest: send get request in IE >= 10, or other browsers
	 * @param {string} url
	 * @param {function} callback
	 * @param {object} context: callback's context
	 */
	function xmlHTTPGetRequest(url, callback, context) {
		let request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				// Success
				callback && (context ? context[callback](request.responseText) : callback(request.responseText));
			} else {
				// We reached our target server, but it returned an error
			}
		};
		request.onerror = function () {
			// There was a connection error of some sort
		};
		request.send();
	}
}

/***
 * Ajax request: dependency jQuery
 * @param {string} url
 * @param {function} callback
 * @param {object} context: callback's context
 */
function getFileContentWithAjax(url, callback, context) {
	$.ajax({
		url: url,
		success: function (data) {
			callback && (context ? context[callback](data) : callback(data));
		}
	});
}

const getScript = (url) => {
	return new Promise((resolve, reject) => {
		if (isResourceLoaded(url)) {
			resolve(true);
		}
		let script = document.createElement('script'),
				prior = document.getElementsByTagName('script')[0],
				isIE9 = (document.documentMode === 9),
				intervalId,
				timeout = 10 * 1000,
				round = undefined;
		if (round) {
			url = addTimestamp(url, round);
		}

		script.onload = script.onreadystatechange = script.onerror = function (_, isAbort) {
			if (_ && _.type === 'error') {
				if (intervalId) {
					clearTimeout(intervalId);
					intervalId = null;
				}
				script.onload = script.onreadystatechange = script.onerror = null;
				script = undefined;
				reject(new Error(`Load error: ${url}`));
			} else if (isAbort || (script && (!script.readyState || /loaded|complete/.test(script.readyState)))) {
				if (intervalId) {
					clearTimeout(intervalId);
					intervalId = null;
				}
				script.onload = script.onreadystatechange = null;
				if (!isIE9) {
					script.onerror = null;
				}

				// Remove the script
				if (isAbort) {
					if (script.parentNode) {
						script.parentNode.removeChild(script);
					}
				}

				if (!document.documentMode || document.documentMode >= 10) {
					script = undefined;
				}

				if (!isIE9) {
					!isAbort && resolve(true);
				} else {
					setTimeout(function () {
						!isAbort && resolve(true);
					}, 0);
				}
			}
		};

		script.src = url;
		prior.parentNode.insertBefore(script, prior);

		if (timeout) {
			intervalId = setTimeout(function () {
				// Known issue: script that is timeout, can't be really canceled
				script.onload(undefined, true);
				reject(new Error(`Time out: ${url}`));
			}, timeout);
		}
	});
};

const getStyle = (url) => {
	return new Promise(function (resolve, reject) {
		if (!url) {
			reject(new Error("url is null!"));
		}
		if (isResourceLoaded(url)) {
			resolve(true);
		}

		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		link.onload = function () {
			resolve(true);
		};
		link.onerror = function (error) {
			reject(new Error(error));
		};

		document.getElementsByTagName('head')[0].appendChild(document.createComment(" Style " + getFileNameFromURL(url).name + " *** CSS "));
		document.getElementsByTagName('head')[0].appendChild(link);
	});
};

const getResources = (urls) => {
	let allUrls = Array.isArray(urls) ? urls : [urls],
			resourcesInfo = allUrls.map((url) => {
				let resourceInfo = getUrlTypeInfo(url);
				resourceInfo.url = url;
				return resourceInfo;
			}),
			resourcesPromise = resourcesInfo.map(urlInfo => {
				let loadFn = urlInfo.loadFn === 'getScript' ? getScript : getStyle;
				return loadFn(urlInfo.url).then((result) => {
					console.log(`Resource loaded: ${urlInfo.url}`);
					return result;
				});
			});
	return Promise.all(resourcesPromise);
};

export {
	loadScript,
	loadScriptWithPromise,
	loadCSS,
	loadCSSWithPromise,
	loadResource,
	loadResources,
	checkResourceLoaded,
	loadUrls,
	getFileContent,
	getFileContentWithAjax,
	getScript,
	getStyle,
	getResources,
}