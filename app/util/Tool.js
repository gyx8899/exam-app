/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 *
 * window 的 resize、scroll、mousedown、mousemove、keyup、keydown
 * From: https://yuchengkai.cn/docs/frontend/#%E9%98%B2%E6%8A%96
 */
function debounce(func, wait = 50, immediate = true) {
	let timer, context, args

	// 延迟执行函数
	const later = () => setTimeout(() => {
		// 延迟函数执行完毕，清空缓存的定时器序号
		timer = null
		// 延迟执行的情况下，函数会在延迟函数中执行
		// 使用到之前缓存的参数和上下文
		if (!immediate) {
			func.apply(context, args)
			context = args = null
		}
	}, wait)

	// 这里返回的函数是每次实际调用的函数
	return function (...params) {
		// 如果没有创建延迟执行函数（later），就创建一个
		if (!timer) {
			timer = later()
			// 如果是立即执行，调用函数
			// 否则缓存参数和调用上下文
			if (immediate) {
				func.apply(this, params)
			} else {
				context = this
				args = params
			}
			// 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
			// 这样做延迟函数会重新计时
		} else {
			clearTimeout(timer)
			timer = later()
		}
	}
}

/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 *
 * window 的 resize、scroll、mousedown、mousemove、keyup、keydown
 * From: https://yuchengkai.cn/docs/frontend/#%E8%8A%82%E6%B5%81
 */
function throttle(func, wait, options) {
	let context, args, result;
	let timeout = null;
	// 之前的时间戳
	let previous = 0;
	// 如果 options 没传则设为空对象
	if (!options) options = {};
	// 定时器回调函数
	let later = function () {
		// 如果设置了 leading，就将 previous 设为 0
		// 用于下面函数的第一个 if 判断
		previous = options.leading === false ? 0 : _.now();
		// 置空一是为了防止内存泄漏，二是为了下面的定时器判断
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		// 获得当前时间戳
		let now = _.now();
		// 首次进入前者肯定为 true
		// 如果需要第一次不执行函数
		// 就将上次时间戳设为当前的
		// 这样在接下来计算 remaining 的值时会大于0
		if (!previous && options.leading === false) previous = now;
		// 计算剩余时间
		let remaining = wait - (now - previous);
		context = this;
		args = arguments;
		// 如果当前调用已经大于上次调用时间 + wait
		// 或者用户手动调了时间
		// 如果设置了 trailing，只会进入这个条件
		// 如果没有设置 leading，那么第一次会进入这个条件
		// 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
		// 其实还是会进入的，因为定时器的延时
		// 并不是准确的时间，很可能你设置了2秒
		// 但是他需要2.2秒才触发，这时候就会进入这个条件
		if (remaining <= 0 || remaining > wait) {
			// 如果存在定时器就清理掉否则会调用二次回调
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			// 判断是否设置了定时器和 trailing
			// 没有的话就开启一个定时器
			// 并且不能不能同时设置 leading 和 trailing
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}

function copyElementToClipboard(copiedElement, callback) {
	let range = document.createRange();
	range.selectNode(copiedElement);

	let selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);

	try {
		// Selected the required text, execute the copy command
		let successful = document.execCommand('copy'),
				msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copy command was ' + msg);
		callback && callback(true);
	} catch (err) {
		console.log('Oops, unable to copy');
		callback && callback(false);
	}

	// Remove the selections - NOTE: Should use removeRange(range) when it is supported
	selection.removeAllRanges();
}

function copyStringToClipboard(copiedString, callback) {
	let bodyBackground = document.body.style.background,
			addDomToBody = (dom, id) => {
				let copiedElement = document.createElement('div');
				id && copiedElement.setAttribute('id', id);
				// copiedElement.setAttribute('style', 'height: 1px;border: 0;opacity: 0;overflow: hidden;');
				copiedElement.innerHTML = dom;
				document.body.appendChild(copiedElement);
				// Set copy element bg transparent
				document.body.style.background = 'transparent';
				return copiedElement;
			},
			removeElementFromBody = (element) => {
				document.body.removeChild(element);
				document.body.style.background = bodyBackground;
			},
			copiedElement = addDomToBody(copiedString);
	copyElementToClipboard(copiedElement, callback);
	removeElementFromBody(copiedElement);
}

/**
 * A funtcion which can easily invoke function from a string method name
 * @param method, eg: 'alert', 'math.floor', 'math.floor.toString'
 * @param params
 * @return {Promise<any>}
 */
function call(method, params) {
	let callMethod = (callers, thisArg) => {
		let caller = callers.shift();
		thisArg = thisArg ? thisArg : (self || this || window);
		thisArg = thisArg[caller];
		if (callers.length > 0) {
			thisArg = callMethod(callers, thisArg);
		}
		return thisArg;
	};
	return new Promise((resolve) => {
		let callers = method.split('.');
		params = Array.isArray(params) ? params : [params];
		let result = callMethod(callers)(...params);
		resolve(result);
	});
}

/**
 * lazy iterator array items
 * @param ary
 * @param fn
 * @param count
 * @return {Function}
 */
function timeChunk(ary, fn, count) {
	let timer = null,
			array = [...ary],
			start = () => {
				for (let i = 0; i < Math.min(count || 1, array.length); i++) {
					fn(array.shift());
				}
			};
	return () => {
		timer = setInterval(() => {
			if (array.length === 0) {
				return clearInterval(timer);
			}
			start();
		}, 200);
	};
}

/**
 * Custom console log modal in function
 */
function _consoleLog() {
	let fnStyle = {};
	const STYLES = [
				'font-size: 14px; color: #8665D5',
				'font-size: 14px; color: #406AD5',
				'font-size: 14px; color: #E9AC32',
				'font-size: 14px; color: #3AC1D9',
				'font-size: 14px; color: #FF7979',
				'font-size: 14px; color: #39D084',
				'font-size: 14px; color: #FF8E66',
				'font-size: 14px; color: #44B1E6',
				'font-size: 14px; color: #9e5648',
				'font-size: 14px; color: #406ad5',
				'font-size: 14px; color: #purple',
				'font-size: 14px; color: #red',
				'font-size: 14px; color: #teal',
				'font-size: 14px; color: #yellow'
			],
			FORMAT = '%c%s';
	return function (...messages) {

		if (window.debug !== false) {
			const fnNameMatcher = /([^(]+)@|at ([^(]+) \(/;
			const fnName = function (str) {
				const regexResult = fnNameMatcher.exec(str);
				return regexResult[1] || regexResult[2];
			};
			const logLines = (new Error().stack).split('\n');
			const callerName = fnName(logLines[2]);

			if (!fnStyle[callerName]) {
				fnStyle[callerName] = STYLES[Object.keys(fnStyle).length % STYLES.length];
			}

			if (fnStyle.lastType !== callerName) {
				console.groupEnd();
				console.group(callerName);
				fnStyle.lastType = callerName;
			}

			if (callerName !== null) {
				console.log(FORMAT, fnStyle[callerName], `${callerName}:`, ...messages);
			} else {
				console.log(...messages);
			}
			return callerName;
		}
	}
}

const consoleLog = _consoleLog();

/**
 * Dynamic set callback function in window
 * @param typeName
 * @returns {*}
 */
function setCallback(typeName) {
	let typeCallback = getCallbackName(typeName);
	if (!window[typeCallback]) {
		window[typeCallback] = function (data) {
			window[typeName] = data;
		};
		return typeCallback;
	}
	return null;
}

/**
 * getCallbackName
 * @param typeName
 * @returns {string}
 */
function getCallbackName(typeName) {
	return typeName + "Callback";
}


/**
 * deepExtend - deep copy with out jQuery
 * @param out
 * @returns {*|{}}
 */
function deepExtend(out) // arguments: (source, source1, source2, ...)
{
	out = out || {};

	for (let i = 1; i < arguments.length; i++) {
		let obj = arguments[i];

		if (!obj)
			continue;

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof obj[key] === 'object'
						&& obj[key] !== null
						&& !Array.isArray(obj[key])
						&& !(obj[key] instanceof Date)
						&& !(obj[key] === 'function')) {
					out[key] = deepExtend(out[key], obj[key]);
				} else
					out[key] = obj[key];
			}
		}
	}
	return out;
}

/**
 * Tools for processing function who has parameter array
 * @param fn
 * @param param1
 * @param param2
 */
function parameterArrayToItem(fn, param1, param2) {
	let param2IsArray = Array.isArray(param2),
			param2ArrayLength = param2IsArray && param2.length || 0;
	for (let i = 0, length = param1.length; i < length; i++) {
		let param2Item = (param2IsArray && i < param2ArrayLength) ? param2[i] : null;
		fn && fn(param1[i], param2Item);
	}
}

// Anchor
function anchorSmoothScroll (selectorNot) {
	let $anchors = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');
	if (typeof selectorNot === "string")
	{
		$anchors = $anchors.not(selectorNot);
	}
	else if (Array.isArray(selectorNot))
	{
		selectorNot.forEach(selector => {
			$anchors = $anchors.not(selector);
		});
	}
	$anchors.click(function (event) {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname)
		{
			let target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length)
			{
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
			}
		}
	});
}

// Scroll
const scrollTop = () => {
	(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
};


export {
	debounce,
	throttle,
	copyElementToClipboard,
	copyStringToClipboard,
	call,
	timeChunk,
	consoleLog,
	setCallback,
	getCallbackName,
	deepExtend,
	parameterArrayToItem,
	anchorSmoothScroll,
	scrollTop,
}