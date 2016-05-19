if (typeof(library) === "undefined") {
	var library = {};
}

var ___BaseUrl = "";

var sysvar = [
	"__gridviewid",
	"__frameid",
	"__pframeid",
	"__pageid",
	"__appid",
	"__pkid",
	"_urlrandom",
	"__wintype",
	"__parafields",
	"__paravalues",
	"__parafieldstype",
	"__showtype",
	"_sgridid",
	"_squerystring",
	"__datasource"
];

var globalSysUrl = [
	"__wintype",
	"__appid",
	"charset"
];

(function (window) {

	var
	_push = Array.prototype.push,
	_slice = Array.prototype.slice,
	//core_indexOf = Array.prototype.indexOf,
	_toString = Object.prototype.toString,
	_hasOwn = Object.prototype.hasOwnProperty,
	//core_trim = String.prototype.trim,
	rCRLF = /\r?\n/g,
	_trim = String.prototype.trim,
	cwb = function (ele, tagObj) {
		return new cwb.fn.init(ele, tagObj);
	};

	cwb.BaseUrl = "";
	cwb.GridID = "";

	cwb.fn = cwb.prototype = {
		constructor : cwb,
		init : function (ele, tagObj) {
			if (!ele) {
				return this;
			}
			if ("object" === typeof ele) {
				return this.length = 1,
				this[0] = ele,
				this;
			}

			if (cwb.ObjExist(ele, tagObj)) {
				return this.length = 1,
				this[0] = cwb.getObject(ele, tagObj),
				this.selector = ele,
				this;
			}

			return cwb.makeArray(cwb.getObject(ele, tagObj), this);
		},

		selector : "",
		length : 0,
		toArray : function () {
			return _slice.call(this);
		},
		get : function (num) {
			return num === null ?
			this.toArray() :
			(num < 0 ? this[this.length + num] : this[num]);
		}
	};
	cwb.fn.init.prototype = cwb.fn;

	cwb.extend = cwb.fn.extend = function () {

		var src,
		copyIsArray,
		copy,
		name,
		options,
		clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}
		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !cwb.isFunction(target)) {
			target = {};
		}

		// extend cwb itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) !== null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (cwb.isPlainObject(copy) || (copyIsArray = cwb.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && cwb.isArray(src) ? src : [];

						} else {
							clone = src && cwb.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = cwb.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	cwb.extend({
		addEvent : function (element, type, handler) {
			if (!element) {
				return this;
			}
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else {
				// assign each event handler a unique ID
				if (!handler.$$guid) {
					handler.$$guid = this.addEvent.guid++;
				}

				// create a hash table of event types for the element
				if (!element.events) {
					element.events = {};
				}

				// create a hash table of event handlers for each element/event pair
				var handlers = element.events[type];
				if (!handlers) {
					handlers = element.events[type] = {};
					// store the existing event handler (if there is one)
					if (element["on" + type]) {
						handlers[0] = element["on" + type];
					}
				}
				// store the event handler in the hash table
				handlers[handler.$$guid] = handler;
				// assign a global event handler to do all the work
				element["on" + type] = handleEvent;
			}
			return this;
		},
		removeEvent : function (element, type, handler) {
			if (!element) {
				return this;
			}
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else {
				// delete the event handler from the hash table
				if (element.events && element.events[type]) {
					delete element.events[type][handler.$$guid];
				}
			}
			return this;
		}
	});

	// a counter used to create unique IDs
	cwb.addEvent.guid = 1;

	var handleEvent = function (event) {
		var returnValue = true;
		// grab the event object (IE uses a global event object)
		event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
		// get a reference to the hash table of event handlers
		var handlers = this.events[event.type];
		// execute each event handler
		for (var i in handlers) {
			this.$$handleEvent = handlers[i];
			if (this.$$handleEvent(event) === false) {
				returnValue = false;
			}
		}
		return returnValue;
	};
	var fixEvent = function (event) {
		// add W3C standard event methods
		event.preventDefault = fixEvent.preventDefault;
		event.stopPropagation = fixEvent.stopPropagation;
		return event;
	};
	fixEvent.preventDefault = function () {
		this.returnValue = false;
	};
	fixEvent.stopPropagation = function () {
		this.cancelBubble = true;
	};

	cwb.extend({
		//当前调用对象
		curObj : function () {
			return this instanceof cwb ? this : cwb;
		},
		isFunction : function (obj) {
			return "[object Function]" === _toString.call(obj);
		},
		isObject : function (obj) {
			return "[object Object]" === _toString.call(obj);
		},
		isArray : function (obj) {
			return "[object Array]" === _toString.call(obj);
		},
		charset : document.charset ? document.charset : document.characterSet ? document.characterSet : null,
		doc : window.document.body || window.document.documentElement,
		isWindow : function (obj) {
			return obj !== null && obj === obj.window;
		},
		isNumber : function (str) {
			return typeof(str) === "number" ? true : false;
		},

		isNull : function (str) {

			var flag = false;
			if (typeof str === "undefined") {
				flag = true;
			} else if (str === null) {
				flag = true;
			} else if (str === "") {
				flag = true;
			}
			return flag;
		},
		htmlencode : function (text) {
			return text.replace(/\'/g, "&#39;")
			.replace(/\"/g, "&quot;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/ /g, "&nbsp;")
			.replace(/\n\r/g, "<br>")
			.replace(/\r\n/g, "<br>")
			.replace(/\n/g, "<br>");
		},
		htmlencodeReturn : function (text) {
			return text.replace(/&#39;/g, "\'")
			.replace(/&quot;/g, "\"")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&nbsp;/g, " ")
			.replace(/&amp;/g, "&");
		},
		isMobile : (function () {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Nokia", "SAMSUNG", "MIDP-2", "CLDC1.1", "SymbianOS", "MAUI", "UNTRUSTED/1.0",
				"Windows CE", "iPhone", "iPad", "Android", "BlackBerry", "UCWEB", "ucweb", "BREW",
				"J2ME", "YULONG", "YuLong", "COOLPAD", "TIANYU", "TY-", "K-Touch", "Haier", "DOPOD",
				"Lenovo", "LENOVO", "HUAQIN", "AIGO-", "CTC/1.0", "CTC/2.0", "CMCC", "DAXIAN", "MOT-",
				"SonyEricsson", "GIONEE", "HTC", "ZTE", "HUAWEI", "webOS", "GoBrowser", "IEMobile", "WAP2.0"];
			var flag = false;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = true;
					break;
				}
			}
			return flag;
		})(),
		getGuid : function () {
			var guid = "";
			for (var i = 1; i <= 32; i++) {
				var n = Math.floor(Math.random() * 16.0).toString(16);
				guid += n;
				//if (usesplit) {
				if ((i === 8) || (i === 12) || (i === 16) || (i === 20)){
					guid += "-";
				}	
				//}
			}
			return guid;
		},
		error : function (msg) {
			throw new Error(msg);
		},
		strToJson : function (str) {
			var json;
			if (typeof(str) !== "string") {
				return str;
			}
			str = str.replace("\r\n", "").trim();
			try {
				//vActCom=eval("("+vActCom+")");
				json = (new Function('return ' + str))();
			} catch (e) {
				alert(str);
			}
			return json;
		},
		I : function (ele, tagObj) {
			return this.getObject(ele, tagObj);
		},
		_ : function (ele, tagObj) {
			return this.getObject(ele, tagObj);
		},
		getObject : function (ele, tagObj) {
			var win = window;
			if (typeof(tagObj) === "object" && tagObj !== null) {
				win = tagObj;
			}
			if (typeof(ele) === 'string') {
				if (win.document.getElementById && win.document.getElementById(ele)) {
					ele = win.document.getElementById(ele);
				} else
					if (win.document.all && win.document.all(ele)) {
						ele = win.document.all(ele);
					} else
						if (win.document.layers && win.document.layers[ele]) {
							ele = win.document.layers[ele];
						} else {
							return null;
						}
				if (!ele) {
					return null;
				}
			}
			return ele;
		},
		/* jshint ignore:start */
		parseXML : function (data, xml, tmp) {
			if (window.DOMParser) { //标准 IE9可以
				tmp = new DOMParser();
				xml = tmp.parseFromString(data, "text/xml");
			} else { //IE
				xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = "false";
				xml.loadXML(data);
			}
			tmp = xml.documentElement;

			if (!tmp || !tmp.nodeName || tmp.nodeName === "parsererror") {
				cwb.message("Invalid XML: " + data);
			}
			return xml;
		},
		/* jshint ignore:end */
		isNotEmpty : function (obj) {

			if (typeof(obj) === "undefined" || obj === null) {
				return false;
			}
			if (typeof(obj) === "function") {
				return true;
			}

			if (typeof(obj) === "string") {
				if (obj !== "") {
					return true;
				} else {
					return false;
				}
			} else {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						return true;
					}
				}
				return false;
			}
		},
		merge : function (first, second) {
			var l = second.length,
			i = first.length,
			j = 0;

			if (typeof l === "number") {
				for (; j < l; j++) {
					first[i++] = second[j];
				}

			} else {
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				}
			}

			first.length = i;

			return first;
		},

		makeArray : function (arr, results) {
			var type,
			ret = results || [];

			if (arr !== null) {
				type = typeof(arr);
				if (arr.length === null || type === "string" || type === "function" || type === "regexp" || cwb.isWindow(arr)) {
					_push.call(ret, arr);
				} else {
					cwb.merge(ret, arr);
				}
			}

			return ret;
		},

		map : function (elems, callback, arg) {
			var value,
			key,
			ret = [],
			i = 0,
			length = elems.length,

			isArray = (length !== undefined) && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || cwb.isArray(elems));

			if (isArray) {
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value !== null) {
						ret[ret.length] = value;
					}
				}
			} else {
				for (key in elems) {
					value = callback(elems[key], key, arg);
					if (value !== null) {
						ret[ret.length] = value;
					}
				}
			}
			// Flatten any nested arrays
			return ret.concat.apply([], ret);
		},

		each : function (obj, callback, args) {
			var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || this.isFunction(obj);

			if (args) {
				if (isObj) {
					for (name in obj) {
						if (callback.apply(obj[name], args) === false) {
							return false;
						}
					}
				} else {
					for (; i < length; ) {
						if (callback.apply(obj[i++], args) === false) {
							return false;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else {
				if (isObj) {
					for (name in obj) {
						if (callback.call(obj[name], name, obj[name]) === false) {
							return false;
						}
					}
				} else {
					for (; i < length; ) {
						if (callback.call(obj[i], i, obj[i++]) === false) {
							return false;
						}
					}
				}
			}
			return obj;
		},

		/**
		 * 获取浏览器信息
		 * @param param
		 * @returns {String}
		 */
		getBrowser : function (param) {

			var
			appName,
			Native = navigator.userAgent.toLowerCase();

			if (document.documentMode || window.postMessage || window.XMLHttpRequest || document.compatMode || window.createPopup || document.all) {
				appName = document.documentMode === 11 ?
					"IE11" : document.documentMode === 10 ?
					"IE10" : document.documentMode === 9 ?
					"IE9" : window.postMessage ?
					"IE8" : window.XMLHttpRequest ?
					"IE7" : document.compatMode ?
					"IE6" : window.createPopup ?
					"IE5.5" : window.attachEvent ?
					"IE5" : document.all ? "IE4" : "-1";
			} else
				/* match 匹配第一个元素 */
				if (Native.indexOf("compatible") > -1 && Native.indexOf("msie") > -1 && Native.indexOf("opera") < 0) {
					appName = Native.indexOf("msie 10.0") > -1 ?
						"IE10" : Native.indexOf("msie 9.0") > -1 ?
						"IE9" : Native.indexOf("msie 8.0") > -1 ?
						"IE8" : Native.indexOf("msie 7.0") > -1 ?
						"IE7" : Native.indexOf("msie 6.0") > -1 ?
						"IE6" : Native.indexOf("msie") > -1 ? "IE" : "-1";
				}

			if (Native.indexOf("firefox") > -1 && Native.indexOf("gecko/") > -1) {
				appName = Native.match(/firefox\/[\d.]+/gi)[0];
			}

			if (Native.indexOf("chrome") > -1 && Native.indexOf("safari") > -1 && Native.indexOf("maxthon") > -1) {
				appName = Native.match(/maxthon\/[\d.]+/gi)[0];
			} else

				if (Native.indexOf("chrome") > -1 && Native.indexOf("safari") > -1 && Native.indexOf("lbbrowser") > -1) {
					appName = Native.match(/lbbrowser\/[\d.]+/gi)[0];
				} else

					if (Native.indexOf("chrome") > -1 && Native.indexOf("safari") > -1) {
						appName = Native.match(/chrome\/[\d.]+/gi)[0];
					} else

						if (Native.indexOf("safari") > -1) { // /webkit/.test(Native);
							appName = Native.match(/safari\/[\d.]+/gi)[0];
						} else
							if (Native.indexOf("camino") > -1) {
								appName = Native.match(/camino\/[\d.]+/gi)[0];
							}

			appName = appName.replace("/", "_");
			if (param && param === "name") {
				appName = appName.split("_")[0];
			}
			return appName;
		},
		autoFrameBody : function (id, offset) {
			var nowBody;
			offset = this.getInt(offset, 0);
			var iframe = this._(id);

			if (browser.indexOf("IE") > -1) {
				if (iframe.contentDocument) {
					nowBody = window.frames[id].document.body;
				} else if (iframe.contentWindow) {
					nowBody = iframe.contentWindow.document.body;
				}

			} else if (browser.indexOf("chrome") > -1 && iframe.contentDocument) {
				nowBody = iframe.contentDocument.body;
			} else {
				if (iframe.contentDocument && iframe.contentDocument.body.offsetHeight) {
					nowBody = iframe.contentDocument.body;
				}
			}
			if (nowBody) {
				nowBody.style.height = parseInt(iframe.clientHeight - offset) + "px"; //chrome
			}
			return this;
		},
		calcPageHeight : function (doc) {
			var cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight),
			sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
			height = Math.max(cHeight, sHeight);
			return height;
		},
		autoAllHeight : function (ids) {

			var arID = ids.split(",");
			for (var i = 0; i < arID.length; i++) {
				this.autoHeight(arID[i]);
			}
		},

		autoHeight : function (id, offset, defValue) {

			//=====================================================================================
			//opera 页面对象宽度（即BODY对象宽度加上Margin宽）,FireFox 可见区域宽度,IE BODY对象宽度
			//NS、FF 认为 offsetHeight 是网页内容实际高度，可以小于 clientHeight。
			//var clientHeight=document.documentElement.clientHeight;
			//opera 可见区域宽度,FireFox  BODY对象高度,IE 可见区域宽度
			//IE、Opera 认为 offsetHeight = clientHeight + 滚动条 + 边框。
			//注：在IE中"可见区域"基本不认可body, 而必需使用documentElement！！！！
			//var bodyHeight=document.body.clientHeight;
			//=====================================================================================
			offset = this.getInt(offset, 0);
			defValue = this.getInt(defValue, 0);
			var nowHeight=0;
			var obj = this._(id);
			if (obj) {
				//obj.style.position="relative";
				if (browser.indexOf("IE") > -1) {
					nowHeight = window.document.documentElement.clientHeight;
					if (browser.indexOf("IE6") > -1) {
						nowHeight = Math.max(window.document.body.clientHeight, nowHeight);
					}

				} else if (browser.indexOf("chrome") > -1) {
					//nowHeight=Math.max(window.document.body.offsetHeight,window.document.documentElement.offsetHeight);
					nowHeight = Math.max(window.document.body.clientHeight, window.document.documentElement.clientHeight);

				} else if (browser.indexOf("firefox") > -1) { //FF  window.innerHeight
					nowHeight = window.innerHeight;
					//Math.max()
				} else {
					nowHeight = document.documentElement.clientHeight;
				}
				//obj.style.height=(nowHeight -obj.offsetTop ) +"px";
				if (obj.offsetParent) {
					offset = offset + obj.offsetTop + obj.offsetParent.offsetTop;
				} else {
					offset = offset + obj.offsetTop;
				}

				if (obj.style) {
					obj.style.height = Math.max((nowHeight - offset), defValue) + "px";
				}
				//removeObjAttr(obj.style);
				//window.onresize=function(){autoHeight(id,offset);}
			}
		},

		getOffset : function (vW, vH, vT, vL) {

			vW = this.getInt(vW, 600);
			vH = this.getInt(vH, 800);
			try {
				var doc = window.document.body || window.document.documentElement;
				vL = (vL < 0) ? 7 : (doc.clientWidth - vW) / 2 + doc.scrollLeft;
				vT = (vT < 0) ? 8 : (doc.clientHeight - vH) / 2 + doc.scrollTop;

				vW = (vW > doc.clientWidth) ? window.clientWidht * 0.98 : vW;
				vH = (vH > doc.clientHeight) ? window.clientHeight - 30 : vH;
			} catch (e) {}
			return {
				"width" : vW + "px",
				"height" : vH + "px",
				"left" : vL + "px",
				"top" : vT + "px"
			};
		},
		gvBtnSave : function (vGridID, vBtnID, vExecType, vRefType, vUrlParaField, vParaField) {
			//__gvBtnSave('2070','#__BTNID#','vExecType','vRefType','vUrlParaField','vFormParaField');
			//vExecType=0只执行SQL,1=执行sql,2=执行sql,3=弹出页面取得信息再执行Sql,
			//vRefType=0不刷新页面 ,1=重载并刷新页面,2=Ajax并刷新页面,

			vExecType = 0;
			vRefType = "";
			vUrlParaField = "";
			vParaField = "";
			/*临时添加 变量*/

			var vDataListID = "";
			var vUrl = "../../Base/Service/getGridAction.jsp?__action=btnGridSave";
			if ((vExecType === 3 || vExecType === "3") && this.isNotEmpty(vUrl)) {
				// vDataListID=__gvWinOpen(vPKID,vPageID,vRefType,'','','','',vUserEnCode,vExtURL,vWinType,vTitle,vUrl,vW,vH,vWinSrc);
			}
			var strUrlField = this.getURLAddNewURL("", vUrlParaField, false);
			/*只获取参数*/
			vUrl = this.UrlParaJoin(vUrl, "__RefType=" + vRefType + "&__GridID=" + vGridID + "&__btnid=" + vBtnID + "&__parafields=" + vParaField + "&__datalistid=" + vDataListID + strUrlField + "&__Random=" + cwb.getUrlRandom());

			var theForm1 = gvWeb.getGvForm(vGridID);
			theForm1.action = vUrl;
			theForm1.target = "__hidFrameContent";
			theForm1.submit();
		},
		gridSearch : function (vGridID) {
			var sForm = document.forms['formSearch' + vGridID]; //formSearch6230
			if (!sForm) {
				sForm = eval("document.formSearch" + vGridID); 
			}
			var queryString = jQuery('#formSearch' + vGridID).formSerialize();
			jQuery(document).ready(function () {
				jQuery.ajax({
					url : sForm.action + "&__debugfield=" + cwb.getUrlField(window.location.href, "__debugfield") + "",
					type : "post",
					data : queryString,
					contentType : "application/x-www-form-urlencoded",
					dataType : "html",
					success : function (vResponseText) {
						//alert(vResponseText);
						document.getElementById("tbody" + vGridID).innerHTML = vResponseText;

					},
					complete : function (XMLHttpRequest, textStatus) {
						if (XMLHttpRequest.status === 200) {}
						else {
							alert("ajax complete:XMLHttpRequest.status=" + XMLHttpRequest.status + " /n XMLHttpRequest.readyState=" + XMLHttpRequest.readyState + " /n textStatus=" + textStatus);
						}
						this; // 调用本次AJAX请求时传递的options参数
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						//ajax执行错误
						alert(library.ajax_error_cn + ":  complete:XMLHttpRequest.status=" + XMLHttpRequest.status + " /n XMLHttpRequest.readyState=" + XMLHttpRequest.readyState + " /n textStatus=" + textStatus);
					}
				});
			});
		},

		isPlainObject : function (obj) {
			return 'isPrototypeOf' in obj && Object.prototype.toString.call(obj) === '[object Object]';
		},

		isCn : function (str) {
			return /.*[\u4e00-\u9fa5]+.*$/.test(str) ? true : false;
		},

		getInt : function (str, vDefValue) {
			if (typeof vDefValue !== "number") {
				vDefValue = 0;
			}
			switch (typeof(str)) {
			case 'number':
				vDefValue = str;
				break;
			case 'string':
				if (!isNaN(parseInt(str))) {
					vDefValue = parseInt(str);
				}
				break;
			case 'boolean':
				vDefValue = (str === true ? 1 : 0);
				break;
			}
			return vDefValue;
		},

		getStr : function (str, vDefValue) {
			/**
			 * 获取字符串
			 * 非string,boolean,number 都返回默认值
			 * @param str
			 * @param vDefValue
			 * @returns
			 */
			if (typeof vDefValue !== "string") {
				vDefValue = "";
			}
			//undefined null 返回默认值  typeof(null)=="object"
			switch (typeof(str)) {
			case 'string':
				if (str !== "") {
					vDefValue = str;
				}
				break;
			case 'boolean':
			case 'number':
				vDefValue = "" + str;
				break;
			}
			return vDefValue;
		},

		getBoolean : function (str, vDefValue) {
			if (typeof vDefValue !== "boolean") {
				vDefValue = false;
			}
			switch (typeof(str)) {
			case 'boolean':
				vDefValue = str;
				break;
			case 'string':
				str = str.toUpperCase();
				if (str.indexOf("true") > -1 || str.length === 1 && str === "1") {
					vDefValue = true;
				}
				break;
			case 'number':
				if (str === 1) {
					vDefValue = true;
				}
				break;
			}
			return vDefValue;
		},
		getAryIsometric : function (aTarget, aSource, defValue) {
			var vTmps = new Array(aTarget.length); //3
			var len = aSource.length; //6

			for (var i = 0; i < vTmps.length; i++) {
				if (i > len - 1) {
					if (defValue !== "") {
						vTmps[i] = defValue;
					} else {
						vTmps[i] = "";
					}
				} else {
					if (aSource[i] === "") {
						vTmps[i] = defValue;
					} else {
						vTmps[i] = aSource[i];

					}
					//if((aTarget.length-1)==i){break;}
				}
			}
			return vTmps;
		},
		trim : function (str) {
			core_trim && !core_trim.call("\uFEFF\xA0") ?
			 (function (text) {
				return text === null ?
				"" :
				core_trim.call(text);
			}()) 
			 :
			 (function (text) {
				return text === null ?
				"" :
				(text + "").replace(rtrim, "");
		}());
		},
		getCookie : function (sName) {
			var aCookie = document.cookie.split("; ");
			var lastMatch = null;
			for (var i = 0; i < aCookie.length; i++) {
				var aCrumb = aCookie[i].split("=");
				if (sName === aCrumb[0]) {
					lastMatch = aCrumb;
				}
			}
			if (lastMatch) {
				var v = lastMatch[1];
				if (v === undefined){
					return v;
				}
					
				return unescape(v);
			}
			return null;
		},

		addClass : function (elem, value) {
			var classNames,
			i,
			l,
			setClass,
			c,
			cl;

			value = this.getStr(value, "");
			classNames = value.split(/\s+/);
			if (elem && elem.nodeType === 1) {
				if (!elem.className && classNames.length === 1) {
					elem.className = value;
				} else {
					setClass = " " + elem.className + " ";
					for (c = 0, cl = classNames.length; c < cl; c++) {
						if (!setClass.contains(" " + classNames[c] + " ")) {
							setClass += classNames[c] + " ";
						}
					}
					elem.className = setClass.trim();
				}
			}
			return this;
		},
		removeClass : function (elem, value) {
			var removes,
			className,
			c,
			i,
			l;
			value = this.getStr(value, "");
			removes = (value || "").split(/\s+/);
			if (elem && elem.nodeType === 1 && elem.className) {

				className = (" " + elem.className + " ").replace(/[\t\r\n]/g, " ");
				// loop over each item in the removal list
				for (c = 0; c < removes.length; c++) {
					// Remove until there is nothing to remove,
					while (className.contains(" " + removes[c] + " ")) {
						className = className.replace(" " + removes[c] + " ", " ");
					}
				}
				elem.className = value ? className.trim() : "";
			}
			return this;
		},

		hasClass : function (elem, className) {

			if (this instanceof cwb) {
				elem = this[0];
			}
			if (1 === elem.nodeType && (" " + elem.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(className) >= 0){
				return !0;
			}
				
			return !1;

		}
	});

	cwb.extend({
		g_fieldCNValue : "",
		g_IsfieldCN : false,
		showHidMenu : function () {
			var vHid = _("hiddenmenudiv");
			var vHidMenu = _("hidulmenu");
			if (vHid.className === "btn-group") {
				vHid.className = "btn-group open";
			} else {
				vHid.className = "btn-group";
			}
		},
		getSpcObjFieldV : function (ele, vIsCN) {

			g_fieldCNValue = "";
			g_IsfieldCN = false;

			var vV = "";
			if (vIsCN) {
				g_IsfieldCN = true;
			}
			if (typeof ele !== "object") {
				return;
			}

			var eleType = ele.type || ele.tagName;

			if (ele.type === "select-one" && ele.getAttribute("size") > 1) {
				eleType = "select-multiple";
			} else
				if (ele.tagName === "SELECT" && !this.isNull(ele.getAttribute("multiple"))) {
					eleType = "select-multiple";
				}

			switch (eleType.toLowerCase()) {
			case 'submit':
			case 'hidden':
				vV = ele.value;
				break;
			case 'password':
			case 'textarea':
			case 'button':
			case 'file':
			case 'table':
				vV = this.getTableV(ele, 1, 5, "");
				break;
			case 'text':
				vV = ele.value;
				break;
			case 'image':
				break;
			case 'select-one':
				vV = this.getSelectV(ele, false);
				break;
			case 'select':
				vV = this.getSelectV(ele, false);
				break;
			case 'select-multiple':
				vV = this.getSelectV(ele, true);
				break;
			case 'checkbox':
				vV = this.getCheckV(ele);
				break;
			case 'radio':
				vV = this.getRadioV(ele);
				break;
			}
			return vV;
		},
		//取值
		getFieldValue : function (eleId, valType) {
			g_fieldCNValue = "";
			g_IsfieldCN = false;
			valType = this.getInt(valType, 2);
			if (valType === 1 || valType === 2) {
				g_IsfieldCN = true;
			}
			var vV = "",
			vI = "";
			var ele={};
			var oSelectV;
			if (typeof eleId === "object") {
				ele = eleId;
			}

			if (typeof eleId === "string") {
				if (this.ObjExist(eleId)) {
					ele = this._(eleId);
				}
			}

			if (!ele) {
				this.message("element of from is undefined:" + eleId); //表单元素不存在:
				return;
			}

			var eleType = ele.type || ele.tagName || ele.nodeName;

			if (ele.type === "select-one" && ele.getAttribute("size") > 1) {
				eleType = "select-multiple";
			} else
				if (ele.tagName === "SELECT" && !this.isNull(ele.getAttribute("multiple"))) {
					eleType = "select-multiple";
				}

			switch (eleType.toLowerCase()) {
			case '#text':
				vV = ele.textContent || ele.parentNode.innerHTML;
				vI = vV;
				break;
			case 'submit':
			case 'hidden':
				vV = ele.value;
				vI = vV;
				break;
			case 'password':
			case 'textarea':
			case 'button':
				vV = ele.value;
				vI = ele.id;
				break;
			case 'file':
			case 'table':
				var oTable = this.getTableV(ele, 1, 5, "");
				vV = oTable.value;
				vI = oTable.id;
				break;
			case 'text':
				vV = ele.value;
				vI = vV;
				break;
			case 'image':
				break;
			case 'select-one':
				oSelectV = this.getSelectV(ele, false, valType);
				vV = oSelectV.value;
				vI = oSelectV.id;
				break;
			case 'select':
				oSelectV = this.getSelectV(ele, false, valType);
				vV = oSelectV.value;
				vI = oSelectV.id;
				break;
			case 'select-multiple':
				oSelectV = this.getSelectV(ele, true, valType);
				vV = oSelectV.value;
				vI = oSelectV.id;
				break;
			case 'checkbox':
				vV = this.getCheckV(ele);
				break;
			case 'radio':
				vV = this.getRadioV(ele);
				break;
			}
			/*
			var objValue="";
			if(valType==0){
			objValue={"id":vI,"value":vV};
			}else if(valType==1){
			objValue={"id":vV,"value":vV};
			}else if(valType==2){
			objValue={"id":vI,"value":vI};
			}
			 */
			return {
				"id" : vI,
				"value" : vV
			};

		},

		getCheckV : function (eleID) {
			var result = "";
			var ele = eleID;
			if (typeof eleID === "string") {
				ele = document.getElementsByName(eleID); //Liyd 0806
			}
			for (var i = 0; i < ele.length; i++) {
				if (ele[i].checked) {
					result = result + "," + ele[i].value;
					result = result.substr(1);
					break;
				}
			}
			/*if (g_IsfieldCN) {
				for (var s = 0; s < ele.length; s++) {
					if (ele.checked) {
						//result= result+","+ele[s].text;
						//result=result.substr(1);
						break;
					}
				}
			}*/
			return result;
		},

		getRadioV : function (eleID) {
			var result = "";
			var ele = eleID;
			if (typeof eleID === "string") {
				ele = document.getElementsByName(eleID);
			}
			for (var i = 0; i < ele.length; i++) {
				if (ele[i].checked) {
					result = ele[i].value;
					break;
				}
			}
			return result;
		},
		//if(__isNull(checkedV)){var checkedV=null}


		getTableV : function (eleID, vCheckCol, vCNCol, vIDCol, vChildType) {

			var vCheckids = "",
			checkNames = null;
			if (!checkedV) {
				vCNCol = checkedV;
			} //checkedV 全局变量;
			if (typeof eleID === "string") {
				eleID = this._(eleID);
			}

			var vName = "";
			for (var i = 1; i < eleID.rows.length; i++) {
				var oCheck = null;
				var vCheck = eleID.rows[i].cells[vCheckCol].childNodes;
				for (var j = 0; j < vCheck.length; j++) {
					if (vCheck[j].tagName === "INPUT" && vCheck[j].type.toLowerCase() === "checkbox") {
						oCheck = vCheck[j];
						break;
					} else if (vCheck[j].tagName === "INPUT" && vCheck[j].type.toLowerCase() === "radio") {
						oCheck = vCheck[j];
						break;
					}
				}
				if (oCheck && oCheck.checked === true) {

					/*
					var vCells=eleID.rows[i].cells[vCNCol].childNodes;
					if(vCells[0].nodeType== 3 && vCells[0].nodeName=="#text"){
					vCheckids +=","+oCheck.value;
					vName +=","+__getCellV(eleID,i,vCNCol,"",true);
					}else{
					vCheckids +=","+__getCellV(eleID,i,vCNCol,"select",true);
					vName +=","+g_fieldCNValue;
					}
					 */
					var oCellV = this.getCellV(eleID, oCheck, i, vCNCol, "select", true, "");
					vCheckids += "," + oCellV.id;
					vName += "," + oCellV.value;
				}
			}
			vCheckids = vCheckids === "" ? "" : vCheckids.substr(1);
			vName = vName === "" ? "" : vName.substr(1);
			return {
				"id" : vCheckids,
				"value" : vName
			};
		},

		getSelectV : function (eleID, flag, valType) {

			var result = "";
			var selectValue = "";
			var obj = eleID;
			if (typeof eleID === "string") {
				obj = this._(eleID);
			}
			if (flag) {
				for (var k = 0; k < obj.options.length; k++) {
					result = result + "," + obj.options[k].value;
					if (valType === 1 || valType === 2) {
						selectValue = selectValue + "," + obj.options[k].text;
					}
				}
				selectValue = selectValue === "" ? "" : selectValue.substr(1);
				result = result.substr(1);
			} else {
				for (var q = 0; q < obj.options.length; q++) {
					if (obj.options[q].selected) {
						result = obj.options[q].value;
						if (valType === 1 || valType === 2) {
							selectValue = obj.options[q].text;
						}
						break;
					}
				}
			}
			return {
				"id" : result,
				"value" : selectValue
			};
		},

		getCellV : function (oTable, oCheck, iRow, iCell, vChildType, vIsCN, vIDCell) {

			var result = "",
			vV = "";
			var cells = oTable.rows[iRow].cells[iCell].childNodes;
			if (oCheck) {
				result = oCheck.value;
			} else if (vIDCell) {
				result = oTable.rows[iRow].cells[vIDCell].innerHTML;
			}
			for (var i = 0; i < cells.length; i++) {
				if (cells[i].nodeType === 3 && cells[i].nodeName === "#text") {
					vV = oTable.rows[iRow].cells[iCell].innerHTML;
					break;
				} else if (cells[i].nodeType === 1 && cells[i].tagName.toLowerCase() === vChildType.toLowerCase()) {
					result = this.getSpcObjFieldV(cells[i], vIsCN);
					break;
				}
			}
			return {
				"id" : result,
				"value" : vV
			};
		},

		setFV : function (id, value) {
			try { //setObjDisable
				if (this.ObjExist(id)) {
					var vTm = this._(id);
					if (vTm) {
						vTm.setAttribute("value", value);
					}
				}
			} catch (e) {
				return false;
			}
		},

		setFieldValue : function (eleId, vV) {
			var ele;
			if (typeof eleId === "object") {
				ele = eleId;
			}

			if (typeof eleId === "string") {
				if (cwb.ObjExist(eleId)) {
					ele = cwb._(eleId);
				}
			}

			if (!vV) {
				vV = "";
			}
			if (!ele) {
				return cwb.message(library.from_not_element + ":" + eleId);
			}
			switch (ele.type.toLowerCase()) {
			case 'submit':
			case 'hidden':
				ele.value = vV;
				break;
			case 'password':
			case 'textarea':
			case 'button':
			case 'file':
			case 'text':
				ele.value = vV;
				break;
			case 'image':
				break;
			case 'select-one':
			case 'select':
				cwb.setSelectValue(ele, vV);
				break;
			case 'checkbox':
				cwb.setCheckValue(ele, vV);
				break;
			case 'radio':
				cwb.setRadioValue(ele, vV);
				break;
			}
		},

		setCheckValue : function (eleID, vV) {
			var arr = vV.split(",");
			var ele = document.getElementsByName(eleID);
			for (var i = 0; i < ele.length; i++) {
				for (var j = 0; j < arr.length; j++) {
					if (ele[i].value === arr[j]) {
						ele.checked = true;
						break;
					}
				}
			}
			return;
		},
		setRadioValue : function (eleID, vV) {
			var ele = document.getElementsByName(eleID);
			for (var i = 0; i < ele.length; i++) {
				for (var j = 0; j < arr.length; j++) {
					if (ele[i].value === vV) {
						ele.checked = true;
						break;
					} else {
						//ele.checked = false;
					}

				}
			}
			return;
		},
		setSelectValue : function (eleID, vV) {
			//var obj=document.getElementById(eleID);
			var obj = this._(eleID);
			var strVs = vV.split(',');
			for (var i = 0; i < strVs.length; i++) {
				for (var k = 0; k < obj.options.length; k++) {
					if (strVs[i] === obj.options[k].value) {
						obj.options[k].selected = true;
					}
				}
			}
			return;
		},
		//============================URLEncode============================
		//URL 编码
		getEncodeURL : function (vUrl) {
			var vEnUrl = "",
			vT = "",
			vFUrl = "";
			if (vUrl.indexOf("&&") >= 0) {
				vUrl = this.replaceAll(vUrl, "&&", "&");
			}
			var aQuery = vUrl.split("&");

			var sTempQuery;
			for (var nTempCount = 0; nTempCount < aQuery.length; nTempCount++) {
				sTempQuery = aQuery[nTempCount];

				if (sTempQuery.indexOf("=") >= 0) {
					vFName = sTempQuery.split("=")[0];
					vT = sTempQuery.split("=")[1];
					if (cwb.isCN(vT)) { //
						vEnUrl = vEnUrl + "&" + vFName + " = " + cwb.URLEncode(vT);
					} else {
						vEnUrl = vEnUrl + "&" + vFName + " = " + vT;
					}

				}
			}
			return vEnUrl.substr(1);
		},

		//中文名称
		URLEncode : function (clearString) {
			return encodeURIComponent(clearString);
			/*
			var output = '';
			var x = 0;
			clearString = clearString.toString();
			var regex = /(^[a-zA-Z0-9_.]*)/;
			while (x < clearString.length) {
			var match = regex.exec(clearString.substr(x));
			if (match != null && match.length > 1 && match[1] != '') {
			output += match[1];
			x += match[1].length;
			} else {
			if (clearString[x] == ' ')
			output += '+';
			else {
			var charCode = clearString.charCodeAt(x);
			var hexVal = charCode.toString(16);
			output += '%' + (hexVal.length < 2 ? '0' : '')
			+ hexVal.toUpperCase();
			}
			x++;
			}
			}
			return output;*/
		},

		/*首字母 大写*/
		FirstUpper : function (name) {
			var uw = name.replace(/\b\w+\b/g, function (word) {
					return word.substring(0, 1).toUpperCase() + word.substring(1);
				});
			return uw;
		},

		downloadFile : function (obj, vBtnID, vGridID, vDownType, vCheckType, vRefType, vBtnOption, vFileID, vPageID, vFieldID, vDataID, vParaFields, vUrl, vExtURL, vRetType, vP1) {

			//你确定要下载
			if (!cwb.getConfirm(vBtnID, library.ok_download, vBtnOption)) {
				return;
			}
			/*弹出 确认前 操作提示*/

			var vIDList = cwb.gvIDList(vGridID, vCheckType);
			/*获取 列表ID*/

			if (vFileID === "" || vFileID === "#FILEID#") {
				vDownType = 1;
			}
			/*点击纪录行，下载纪录对应的附件 单个或多个文件*/

			var vURL = "",
			vEndUrl = "";
			vURL = cwb.UrlParaJoin(vURL, vExtURL);

			if (vPageID === "#__PAGEID#") {
				vPageID = "";
			}
			if (vFileID === "#FILEID#") {
				vFileID = "-1";
			}
			vDownType = cwb.getInt(vDownType, -1);
			vEndUrl = "__fileid=" + vFileID + "&__dataid=" + vDataID + "&__pageid=" + vPageID + "&__fieldid=" + vFieldID + "&__rowid=" + vIDList;

			var success = function (data) {
				data = data.trim();
				if (data === 1) {
					vURL = "../../Base/Service/getFieldAction.jsp?__action=downloadFile";
					if (vDownType === 1) {
						vURL = "../../Base/Service/getFieldAction.jsp?__action=downloadZipPackage";
						vIDList = cwb.gvIDList(vGridID, vCheckType);
					}

					if (vExtURL === "#EXTURL#") {
						vExtURL = "";
					}
					vURL = cwb.UrlParaJoin(vURL, vEndUrl);

					document.getElementById("__hidFrameContent").src = vURL;
				} else {
					//alert(data);
					fmWeb.getMsgXML(data);
				}
			};
			var vURLTest = "../../Base/Service/getFieldAction.jsp?__action=downLoadFileTest";
			if (vDownType === 1) {
				vURLTest = vURLTest + "&__isZipPackage=1";
			}
			vURLTest = cwb.UrlParaJoin(vURLTest, vEndUrl);
			return cwb.ajaxExecuted(vURLTest, "get", "html", success, "", false, "", "");

		},

		//获取 列表选择ID

		gvValueList : function (vGridID, vGetVCell, RetType) {

			var iCount = 0;
			var vValueList = "";
			var vValueIDList = "";
			vGridID = this.getGridId(vGridID);
			if (this.ObjNameExist("gvGridView" + vGridID)) {
				var checkNames = cwb.N("chk" + ___GridID);
				for (var i = checkNames.length - 1; i >= 0; i--) {
					if (checkNames[i].checked === true) {
						iCount++;

						var result = "";
						var ids = "";
						var oFieldV;
						var cells = checkNames[i].parentNode.parentNode.cells[vGetVCell].childNodes;
						for (var k = 0; k < cells.length; k++) {
							if (cells[k].nodeType === 3 && cells[k].nodeName === "#text") {
								if (cells[k].nodeValue) {
									result = cells[k].nodeValue;
								} else if (cells[k].textContent) {
									result = cells[k].textContent;
								} else {
									result = checkNames[i].parentNode.parentNode.cells[vGetVCell].innerHTML;
								}
								break;
							} else if (cells[k].nodeType === 1 && cells[k].tagName.toLowerCase() === "select") {
								oFieldV = this.getFieldValue(cells[k]);
								result = oFieldV.values;
								ids = oFieldV.ids;
								break;
							} else if (cells[k].nodeType === 1) {
								oFieldV = this.getFieldValue(cells[k]);
								result = oFieldV.values;
								ids = oFieldV.ids;
								break;
							}
						}
						vValueList = (vValueList === "" ? result : vValueList + "," + result);
						vValueIDList = (vValueIDList === "" ? ids : vValueIDList + "," + ids);
					}
				}
			}
			if (RetType) {
				return {
					"id" : vValueIDList,
					"value" : vValueList
				};
			}
			return vValueList;
		},

		/**
		 * 所有替换
		 * @param strOrg1 替换的字符串
		 * @param strFind 替换的字符
		 * @param strReplace 替换后的字符
		 * @returns {String}
		 */
		mReplaceAll : this.replaceAll,
		replaceAll : function (strOrg1, strFind, strReplace) {
			var index = 0;
			var strOrg = strOrg1;
			while (strOrg.indexOf(strFind, index) !== -1) {
				strOrg = strOrg.replace(strFind, strReplace);
				index = strOrg.indexOf(strFind, index);
			}
			return strOrg;
		},

		/**
		 * 获取列表ID
		 * @param vGridID
		 * @returns {String}
		 */
		getGridId : function (vGridID) {
			var vGvId = vGridID || __GRIDID || ___GridID || "";

			if (typeof(vGvId) === "string") {
				vGvId = "__GRIDID";
			}

			if (this.ObjExist(vGvId)) {
				vGvId = this._(vGvId).value;
				//gvWeb.GridID = vGvId;
			}

			return vGvId;
		},

		/**
		 * 获取列表选择ID
		 * @param vGridID 列表ID
		 * @param vCheckType 选择类型
		 * @param vColor 选择后变化的颜色
		 * @returns
		 */
		gvIDList : function (vGridID, vCheckType, vColor) {

			var iCount = 0;
			var vIDList = "";
			vCheckType = this.getInt(vCheckType, 0);
			vColor = this.getStr(vColor, "");
			if (vCheckType === 0) {
				return vIDList;
			}

			vGridID = this.getGridId(vGridID);

			if (this.ObjNameExist("chk" + vGridID)) {
				var checkNames = this.N("chk" + vGridID);
				if (vCheckType === 3 && checkNames.length < 2) {
					this.showNews(library.must_two_select_record, library.message, 170, 70, 1200, {
						"mack" : false
					});
					return false;
				}
				for (var i = checkNames.length - 1; i >= 0; i--) {
					if (checkNames[i].checked === true) {
						iCount++;
						if (vIDList !== "") {
							vIDList = vIDList + "," + checkNames[i].value;
						} else {
							vIDList = checkNames[i].value;
						}
						if (vColor !== "") {
							gvWeb.gvChangeTrColor(checkNames[i], vColor, "bold", "");
						}
						if (vCheckType === 1) {
							/*Liyd 单行记录*/
							break;
						}
					}
				}

				if ((vCheckType !== 0) && vCheckType !== 4 && iCount === 0) {
					this.showNews(library.select_record, library.message, 170, 70, 1200, {
						"mack" : false
					});
					return false;
				}
			} else {
				if (vCheckType === 4) {
					return "";
				} else {
					this.showNews(library.not_select_record, library.message, 270, 70, 1200, {
						"mack" : false
					});
					return false;
				}
			}
			return vIDList;
		},

		/**
		 * 获取 警告标题
		 * @param vBtnID
		 * @returns {String}
		 */
		getTitle : function (vBtnID) {
			var title = "";
			if (this.ObjExist("wfc_" + vBtnID)) {
				// var oBtn=document.getElementById("wfc_"+vBtnID);
				//title=__getFieldValue("wfc_"+vBtnID,"1").value;
				var oBtn = this._("wfc_" + vBtnID);
				title = this.getFieldValue("wfc_" + vBtnID, "1").value;
			}
			return title;
		},
		/**
		 * 弹出 警告窗口
		 * @param vBtnID
		 * @param vConfirmTitle
		 * @param vBtnOption
		 * @returns {Boolean}
		 */
		getConfirm : function (vBtnID, vConfirmTitle, vBtnOption) {
			/*按钮选项*/
			if (vConfirmTitle === "") {
				try {
					vConfirmTitle = this.getTitle(vBtnID) + library.ok_option;
				} catch (e) {
					vConfirmTitle = this.getStr(vConfirmTitle, library.ok_option); //确认
				}
			}
			vBtnOption = this.getInt(vBtnOption, -1);

			if (vBtnOption === 10) {
				/*确认后在操作*/
				if (!confirm(vConfirmTitle)) {
					return false;
				}
			} else if (vBtnOption === 12) {
				/*编辑属性*/

			}
			return true;
		},

		/**
		 * 从 页面中获ID,NAME值 并添加到URL
		 * @param vExtUrl 扩展参数
		 * @param vParaField 参数替换字段
		 * @param iRowIndex 列表记录位置
		 * @param valType 列表记录中取值类型
		 * @returns
		 */
		getPageDecodeURL : function (vExtUrl, vParaField, iRowIndex, valType) {
			var tmpV = "";
			var isCN = true;
			vExtUrl = this.getStr(vExtUrl, "");
			if (vExtUrl === "") {
				return "";
			}
			/*空返回*/
			// vExtUrl=vExtUrl.toLowerCase();/*扩展参数 转换成小写*/
			vParaField = this.getStr(vParaField, "");

			vParaField = this.replaceAll(vParaField, ",,", ",");
			var vIDs = vParaField.split(",");
			for (var k = 0; k < vIDs.length; k++) {
				if ((cwb.ObjExist(vIDs[k]) || cwb.ObjExist(vIDs[k] + "_" + iRowIndex)) && vExtUrl.indexOf("#" + vIDs[k] + "#") > -1) {
					var vtmls = (iRowIndex ? vIDs[k] + "_" + iRowIndex : vIDs[k]);
					if (valType) {
						tmpV = this.getFieldValue(vtmls, "2").id;
					} else {
						tmpV = this.getFieldValue(vtmls, "2").value;
					}

					if (vIDs[k] !== "") //&& __isNotEmpty(tmpV)
					{
						vExtUrl = this.replaceAll(vExtUrl, "#" + vIDs[k] + "#", tmpV);
					}
				}
			}
			return vExtUrl;
		},

		/**
		 * 从 URL中获值 并添加到 新URL
		 * @param vExtUrl 扩展参数
		 * @param vUrlParaField 参数替换字段
		 * @returns
		 */
		getUrlDecodeURL : function (vExtUrl, vUrlParaField) {

			vExtUrl = cwb.getStr(vExtUrl, "");
			if (vExtUrl === "") {
				return "";
			}
			/*空返回*/
			vUrlParaField = cwb.getStr(vUrlParaField, "");
			// vUrlParaField=vUrlParaField.toLowerCase();/*参数字段转换成小写*/
			//vExtUrl=vExtUrl.toLowerCase();

			vUrlParaField = cwb.replaceAll(vUrlParaField, ",,", ",");
			if (vExtUrl !== "") {
				var vIDs = vUrlParaField.split(","); //var aQuery = vUrl.split("&");
				for (var i = 0; i < vIDs.length; i++) {
					var vV = cwb.getUrlField(window.location.href, vIDs[i]);
					if (vIDs[i] !== "") {
						vExtUrl = this.replaceAll(vExtUrl, "#" + vIDs[i] + "#", vV);
						//strUrlField=strUrlField+"&"+vfs[i]+"="+vV;
					}
				} //if i
			}
			return vExtUrl;
		},

		/**
		 *
		 * @param vUrl url
		 * @param vVParaFields 参数字段
		 * @param isCN 是否添加名称(eg：CLATY CLATY_CN)
		 * @returns
		 */
		getPageAddURL : function (vUrl, vVParaFields, isCN) {

			var vUrlext = "";
			var vIDs = vVParaFields.split(",");
			for (var k = 0; k < vIDs.length; k++) {
				if (cwb.ObjExist(vIDs[k])) {
					tmpV = cwb.getFieldValue(vIDs[k]);
					if (vIDs[k] !== "" && cwb.isNotEmpty(tmV)) {
						vUrlext = vUrlext + "&" + vIDs[k] + "=" + tmpV.id; //name  encodeURIComponent(
					}
					if (isCN) {
						vUrlext = vUrlext + "&" + vIDs[k] + "_CN=" + tmpV.value;
					}
				}
			}
			if (vUrlext !== "") {
				vUrlext = vUrlext.substr(1);
			}

			return this.UrlParaJoin(vUrl, vUrlext);
		},

		/*从 URL中获值 并添加到 新URL*/
		/*vUrl: url  vFields:参数字段  isCN:是否添加名称(eg：CLATY CLATY_CN) 字段ID-- 为参数*/
		getURLAddNewURL : function (vUrl, vUrlParaField, isCN) {

			var strUrlField = "";
			vUrlParaField = this.getStr(vUrlParaField, "");
			if (vUrlParaField !== "") {
				var vfs = vUrlParaField.split(","); //var aQuery = vUrl.split("&");
				for (var i = 0; i < vfs.length; i++) {
					var vV = this.getUrlField(window.location.href, vfs[i]);
					// alert("vV="+vV);
					if (vfs[i] !== "" && this.isNotEmpty(vV)) {
						strUrlField = strUrlField + "&" + vfs[i] + "=" + vV;
					}
				} //if i
			}
			if (strUrlField !== "") {
				strUrlField = strUrlField.substr(1);
			}

			return this.UrlParaJoin(vUrl, strUrlField);
		},

		getURLConnector : function (vURL, vExtUrl) {
			return this.UrlParaJoin(vURL, vExtUrl);
		},
		/**
		 * 处理 URL 添加连接符 (eg: ? and &)
		 * @param vURL
		 * @param vExtUrl
		 * @returns
		 *
		 * eg1 : www.baidu.com?
		 * eg2 : www.baidu.com?a=1
		 * eg3 : www.baidu.com
		 * eg4 : b=1&c=2
		 * eg5 : &b=1&c=3
		 */
		UrlParaJoin : function (vURL, vExtUrl) {
			vURL = cwb.getStr(vURL, "");
			vExtUrl = cwb.getStr(vExtUrl, "");
			if (vURL !== "" && vExtUrl !== "") {
				vURL = vURL + (vURL.indexOf("?") > -1 ? "" : "?") + "&" + vExtUrl;
				vURL = vURL.replace(/&&/gi, "&").replace("?&", "?");
			}
			return vURL;
		},

		defOpt : {
			contentType : "application/x-www-form-urlencoded",
			type : "get",
			dataType : "html",
			complete : function (XMLHttpRequest, textStatus) {
				if (XMLHttpRequest.status === 200) {}
				else {
					alert("ajax complete:XMLHttpRequest.status=" + XMLHttpRequest.status + " /n XMLHttpRequest.readyState=" + XMLHttpRequest.readyState + " /n textStatus=" + textStatus);
				}
				this; // 调用本次AJAX请求时传递的options参数
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				alert(library.ajax_error_cn + ":  complete:XMLHttpRequest.status=" + XMLHttpRequest.status + " /n XMLHttpRequest.readyState=" + XMLHttpRequest.readyState + " /n textStatus=" + textStatus);
			}
		},

		/**
		 * 执行Ajax方法
		 * @param vURL
		 * @param vType
		 * @param vDataType
		 * @param success
		 * @param error
		 * @param vAsync
		 * @param vLoadType
		 * @param defOption
		 */
		ajaxExecuted : function (vURL, vType, vDataType, success, error, vAsync, vLoadType, defOption) {
			//var cur=
			var defOpt = this.defOpt;
			if (typeof jQuery === "undefined") {
				alert(library.no_find_jquery);
			} //未发现jQuery
			if (!vURL) {
				return;
			}
			vLoadType = this.getStr(vLoadType, "");
			var opt = {
				url : vURL,
				type : vType ? vType : defOpt.type,
				async : cwb.getBoolean(vAsync, false),
				contentType : defOpt.contentType,
				data : defOpt.data || "",
				dataType : vDataType ? vDataType : defOpt.dataType,
				success : cwb.isFunction(success) ? success : defOpt.success,
				complete : defOpt.complete,
				error : cwb.isFunction(error) ? error : defOpt.error
			} ;//opt end

			if (cwb.isObject(defOption)) {
				opt = cwb.extend(opt, defOption);
			}

			if (vLoadType === "onload") {
				jQuery(document).ready(function () {
					jQuery.ajax(opt);
				});
			} else {
				jQuery.ajax(opt);
			}
			return;
		},

		/**
		 * 通过文件位置 解析xml
		 * @param xmlFile
		 * @returns
		 */
		getPathXML : function (xmlFile) {
			var loadXML = function (xmlFile) {
				var xmlDoc;
				
				
				if (window.ActiveXObject) {
					xmlDoc = new ActiveXObject('Microsoft.XMLDOM'); //IE浏览器
					xmlDoc.async = false;
					xmlDoc.load(xmlFile);
				} else if ( navigator.userAgent.indexOf("Firefox") > 0) { //火狐浏览器
					//else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
					xmlDoc = document.implementation.createDocument('', '', null);
					xmlDoc.load(xmlFile);
				} else { //谷歌浏览器

					var xmlhttp = new window.XMLHttpRequest();
					xmlhttp.open("GET", xmlFile, false);
					xmlhttp.send(null);
					if (xmlhttp.readyState === 4) 
					{
						xmlDoc = xmlhttp.responseXML.documentElement;
					}
				}
				return xmlDoc;
			};
			// 首先对xml对象进行判断
			var checkXMLDocObj = function (xmlFile) {
				var xmlDoc = loadXML(xmlFile);
				if (xmlDoc === null) {
					alert(library.browser_no_xml);
					window.location.href = '../err.html';

				}
				return xmlDoc;
			};
			return checkXMLDocObj(xmlFile);
		},

		getStrXML : function (strXml) {
			var xmlDom = null;
			//IE
			if (!window.DOMParser && window.ActiveXObject) {
				xmlDom = new ActiveXObject("Microsoft.XMLDOM");
				xmlDom.loadXML(strXml);
			} else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
				xmlDom = new DOMParser().parseFromString(strXml, "text/xml");
			}
			/*
			var results = xmlDom.childNodes.length;//1
			var res = xmlDom.getElementsByTagName("item");
			var str = res[0].firstChild.nodeValue;//taskO
			 */
			return xmlDom;
		},

		getValueByTagName : function (doc, id, index, vV) {
			var vValue = "";
			var oTag = doc.getElementsByTagName(id);
			var oItem = oTag.item(index);
			if (oItem === null) {
				oItem = oTag[index];
			}
			if (oItem.text) {
				vValue = oItem.text;
			} else if (oItem.textContent) {
				vValue = oItem.textContent;
			} else if (oItem.childNodes.length > 0) {
				vValue = oItem.childNodes[0].nodeValue;
			}
			return vValue;
		},

		/**
		 * 刷新
		 * @param vRefresh
		 * @param oRefreshOpt
		 */
		setRefreshPage : function (vRefresh, oRefreshOpt) {
			var win;
			vRefresh = this.getInt(vRefresh, 0);
			if (vRefresh === 11 || vRefresh === 1) {
				window.location.href = window.location.href;
			} else if (vRefresh === 12 || vRefresh === 2) {
				parent.window.location.href = parent.window.location.href;
			} else if (vRefresh === 13 || vRefresh === 3) {
				parent.parent.window.location.href = parent.parent.window.location.href;
			} else if (vRefresh === 14 || vRefresh === 4) {
				parent.parent.parent.window.location.href = parent.parent.parent.window.location.href;
			} else if (vRefresh === 15 || vRefresh === 5) {
				parent.parent.parent.parent.window.location.href = parent.parent.parent.parent.window.location.href;
			} else if (vRefresh === 16 || vRefresh === 6) { //指定目标刷新
				if (typeof(oRefreshOpt.refleshid) !== 'undefined' || oRefreshOpt.refleshid !== "") {
					win = window;
					while (!CWB.ObjExist(oRefreshOpt.refleshid, win)) {
						win = win.parent;
						if (win === top) {
							break;
						}
					}
					var target = cwb._(oRefreshOpt.refleshid, win);
					if (target && target.src) {
						cwb._(oRefreshOpt.refleshid, win).src = target.src;
					}
				}
			} else if (vRefresh === 17 || vRefresh === 7) {
				if (oRefreshOpt && oRefreshOpt.callwin) {
					win = oRefreshOpt.callwin;
					win.location.href = win.location.href;
				}
			} else if (vRefresh === 18 || vRefresh === 8) {
				try {
					var vGID = this.getGridId();
					gv.gridSearch(vGID);
				} catch (e) {}
			}
			return this;
		},

		/**
		 * 返回后操作
		 * @param vBtnID
		 * @param vResponseText
		 * @param vIDList
		 * @param vGridviewID
		 * @param vPageID
		 * @param vRefType
		 * @param vWinType
		 * @param vUserEnCode
		 * @param vRetType
		 * @param msgOpt
		 * @param closeOpt
		 * @param delOpt
		 * @param refreshOpt
		 */
		getRefoption : function (vBtnID, vResponseText, vIDList, vGridviewID, vPageID, vRefType, vWinType, vUserEnCode, vRetType, msgOpt, closeOpt, delOpt, refreshOpt) {

			vRefreshType = this.getInt(vRefType, -1); //刷新类型
			vReturnType = this.getInt(vRetType, -1); //返回类型
			if (!msgOpt) {
				msgOpt = {};
			}
			switch (vReturnType) {
			case 10: //无返回
				break;
			case 11: //无返回消息
				break;
			case 12: //返回消息
				vResponseText = this.getStr(vResponseText, "");
				var len = vResponseText.length * 12;
				if (vResponseText.length * 12 < 100) {
					len = 100;
				}
				this.showNews(vResponseText, library.message, len + 20, 70, 1200, {
					"reftype" : vRefType,
					"mack" : false
				});
				break;
				//this.message(vResponseText);
			case 13: //成功后关闭
				DWB.gvWinClose(vBtnID, vPageID, vReturnType, vRefreshType, "", "", "", "", vUserEnCode, vWinType, vRefreshType, closeOpt);
				break;
			case 14: //成功后删除
				var count = gvWeb.gvRemoveRows(vGridviewID, vIDList, "");
				if (count > 0) {
					msgOpt.mack = false;
					this.showNews(vResponseText, library.message, 130, 70, 1000, msgOpt);
				}
				break;
			case 15:
				break;
			}
			//真实删除数据
			//__gvBtnRemoveRows(vBtnID,vGridID,vPageID,vType,vCheckType,vBtnOption,vRefType,'0');
			if (vReturnType !== 12) {
				this.setRefreshPage(vRefreshType, refreshOpt);
			}
			return this;
		},
		getObjectByName : function (ele, tagObj) {
			var win = window;
			if (typeof(tagObj) === "object" && tagObj !== null) {
				win = tagObj;
			}
			if (typeof(ele) === 'string') {
				if (win.document.getElementsByName && win.document.getElementsByName(ele)) {
					ele = win.document.getElementsByName(ele);
				} else
					if (win.document.all && win.document.all(ele)) {
						ele = win.document.all(ele);
					} else
						if (win.document.layers && win.document.layers[ele]) {
							ele = win.document.layers[ele];
						} else {
							return null;
						}
				if (!ele) {
					return null;
				}
			}
			return ele;
		},
		N : function (ele, tagObj) {
			return this.getObjectByName(ele, tagObj);
		},

		//通过ID判断对象是否存在
		ObjExist : function (objId, tagObj) {
			var win = window;
			if (typeof(tagObj) === "object" && tagObj !== null) {
				win = tagObj;
			}
			if (typeof(objId) === "string") {
				if (win.document.getElementById && win.document.getElementById(objId)) {
					return true;
				} else
					if (win.document.all && document.all(objName)) { //typeof(eval("document.all."+objId))
						return true;
					} else
						if (win.document.layers && typeof(win.document.layers[objId])) {
							return true;
						}
			} else if (typeof(objName) === "object" && objName !== null) {
				return true;
			}
			return false;
		},

		/**
		 * 通过Name判断对象是否存在
		 * @param objName
		 * @param tagObj
		 * @returns {Boolean}
		 */
		ObjNameExist : function (objName, tagObj) {
			var win = window;
			if (typeof(tagObj) === "object" && tagObj !== null) {
				win = tagObj;
			}
			if (typeof(objName) === "string") {
				if (win.document.getElementsByName && win.document.getElementsByName(objName)) {
					return true;
				} else
					if (win.document.all && document.all(objName)) { //typeof(eval("document.all."+objId))
						return true;
					} else
						if (win.document.layers && typeof(win.document.layers[objName])) {
							return true;
						}
			} else if (typeof(objId) === "object" && objId !== null) {
				return true;
			}
			return false;
		},

		setGlobal : function (names) {
			var nameAry = names.split(",");
			for (var i = 0; i < nameAry.length; i++) {
				if (typeof(window[nameAry[i]]) === "undefined") {
					window[nameAry[i]] = cwb[nameAry[i]];
				}
			}

		},
		/**
		 * //正则获取URL参数值
		 * @param name
		 * @returns
		 */
		getQueryStr : function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null){
				return decodeURI(r[2]);
			}	
			return "";
		},
		//正则
		UrlParamDel : function (url, name) {
			var reg = new RegExp("\\\?|&" + name + "= ([^&]+)(&|&)", "i");
			return url.replace(reg, "");
		},

		UrlParams : function (url, name, value) {
			//var reg=new RegExp("(\\\?|&)"+name+"=([^&]+)(&|$)","i");
			var reg = new RegExp("(\\\?|&)" + name + "=([^&]*)(&|$)", "i");
			var m = url.match(reg);
			if (typeof value !== 'undefined' || value !== null) { //赋值
				if (m) {
					return (url.replace(reg, function ($0, $1, $2) {
							if ($2 === "") {
								$0 = $0.replace(/&/gi, "");
								$0 = m[1] + $0 + value + m[3];
							} else {
								$0 = $0.replace($2, value);
							}
							return ($0).replace(/&&/gi, "&");
						}));
				} else {
					return (url.indexOf('?') === -1) ? (url + '?' + name + '=' + value) : (url + '&' + name + '=' + value).replace(/&&/gi, "&");
				}
			} else { //取值
				if (m) {
					return decodeURI(m[2]);
				} else {
					return '';
				}
			}
		},
		/*
		获取URL 参数值
		 */
		getUrlField : function (vUrl, vFName) {
			var res="";
			if (!cwb.isNotEmpty(vUrl)|| !cwb.isNotEmpty(vFName)){
				return res;
			}
				
			if (vUrl.toLowerCase().indexOf(vFName.toLowerCase()) < 0) {
				return res;
			}
			if (vUrl.indexOf("?") === 0){
				vUrl = vUrl.substr(1);
			    vUrl = vUrl.substr(vUrl.indexOf("?") + 1);
			}
				
			if (vUrl.indexOf("&") >= 0) 
			{
				if (vUrl.indexOf("&&") >= 0) {
					vUrl = mReplaceAll(vUrl, "&&", "&");
				}
				var aQuery = vUrl.split("&");
				var sTempQuery;
				for (var nTempCount = 0; nTempCount < aQuery.length; nTempCount++) 
				{
					sTempQuery = aQuery[nTempCount];
					//alert("sTempQuery="+sTempQuery);
					if (sTempQuery.indexOf("=") >= 0) {
						if (sTempQuery.substring(0, sTempQuery.indexOf("=")).toLowerCase() === vFName.toLowerCase()) 
						{
							res= sTempQuery.substr(sTempQuery.indexOf("=") + 1);
							break;
						}
					}
					//else return "";
				}
	
			} else {
				if (vUrl.indexOf("=") >= 0) 
				{
					if (vUrl.substring(0, vUrl.indexOf("=")) === vFName) 
					{
						res= vUrl.substr(vUrl.indexOf("=") + 1);
						//break;
					} 
				} 
			}
			return res;
		},

		//截取固定长度子字符串 sSource为字符串iLen为长度
		getSubStr : function (sSource, iLen) {
			if (cwb.getInt(iLen, 0) === 0) {
				return sSource;
			}
			if (sSource.replace(/[^\x00-\xff]/g, "xx").length <= iLen) {
				return sSource;
			}
			var ELIDED = "";

			var str = "";
			var l = 0;
			var schar=sSource.charAt(i);
			for (var i = 0; schar; i++) {
				str += schar;
				l += (schar.match(/[^\x00-\xff]/) !== null ? 2 : 1);
				if (l >= iLen - ELIDED.length) {
					break;
				}
			}
			str += ELIDED;
			return str;
		},

		//获取长度 包括中文
		getLength : function (sSource, iLen) {
			var l = 0;
			for (var i = 0; i < sSource.length; i++) {
				var schar = sSource.charAt(i);
				l += (schar.match(/[^\x00-\xff]/) !== null ? 2 : 1);
			}
			return l;
		},

		/**
		 *
		 * @param vMsg
		 * @param vTitle
		 * @param vW
		 * @param vH
		 * @param setTime
		 * @param opt  {mack:false 罩子,refopt:{reftype:11,..}}
		 */
		showNews : function (vMsg, vTitle, vW, vH, setTime, opt) {
			/*
			if(!vTitle){vTitle=library.message;}
			vW=cwb.getInt(vW,270);
			vH=cwb.getInt(vH,70);
			setTime=cwb.getInt(setTime,1200);
			if(!opt){opt={"mack":false};}
			 */
			try {
				DWB.alertWin(vMsg, vTitle, vW, vH, setTime, opt);
			} catch (e) {
				alert(vMsg);
			}
		},

		getUrlRight : function (vUrl, vRightType, vRoleID, vFlowOpt) {
			if (vRightType === null) {
				return vUrl;
			}
			vRightType = CWB.getInt(vRightType, 0);

			switch (vRightType) {
			case 0:
				vUrl = this.UrlParams(vUrl, "__righttype", "0");
				vUrl = this.UrlParams(vUrl, "__rightid", "0");
				break;
			case 1:
				vUrl = this.UrlParams(vUrl, "__righttype", "1");
				vUrl = this.UrlParams(vUrl, "__rightid", "1");
				//strUrl=strUrl+"&__righttype=1&__rightid=1";
				break;
			case -1:
				vUrl = this.UrlParams(vUrl, "__righttype", "-1");
				vUrl = this.UrlParams(vUrl, "__rightid", "-1");
				//strUrl=strUrl+"&__righttype=-1&__rightid=-1";
				break;
			case 2:
				vUrl = this.UrlParams(vUrl, "__righttype", "2");
				vUrl = this.UrlParams(vUrl, "__rightid", "2");
				vUrl = this.UrlParams(vUrl, "__roleid", vRoleID);
				//strUrl=strUrl+"&__righttype=2&__rightid=2&__roleid="+vActionRoleID;
				break;
			case 3:
				vUrl = this.UrlParams(vUrl, "__righttype", "3");
				vUrl = this.UrlParams(vUrl, "__rightid", "3");
				vUrl = this.UrlParams(vUrl, "__flowid", vFlowOpt.flowid);
				vUrl = this.UrlParams(vUrl, "__actionid", vFlowOpt.actionid);
				vUrl = this.UrlParams(vUrl, "__actioninsid", vFlowOpt.actioninsid);
				//strUrl=strUrl+"&__righttype=3&__rightid=3&__flowid="+vFlowID+"&__actionid="+vActionRoleID+"&__actioninsid="+vActionInsID;
				break;
			}
			return vUrl;
		},

		/**
		 * 获取随机数
		 * @returns
		 */
		getUrlRandom : function () {
			return parseInt(100 * Math.random(10));
		/*	var now = new Date();
			var year = now.getYear();
			var Month = now.getMonth() + 1;
			var Day = now.getDate();
			var Hour = now.getHours();
			var Minute = now.getMinutes();
			var Second = now.getSeconds();
			return year + "-" + Month + "-" + Day + "-" + Hour + "-" + Minute + "-" + Second;*/
		},

		formatField : function () {
			var flag = false;
			var args = Array.prototype.slice.call(arguments);
			for (var i = 0; i < args.length; i++) {
				if (typeof(args[i]) === "string" && args[i].indexOf("#") > -1) {
					args[i] = "";
					flag = true;
				}
			}
			if (!flag) {
				return null;
			}
			//var selfs=arguments.callee;
			return args;
		},

		cancelBubble : function (e) {
			var evt = e ? e : window.event;
			if (evt.stopPropagation) {
				//W3C
				evt.stopPropagation();
			} else {
				//IE
				evt.cancelBubble = true;
			}
		},

		/**
		 *
		 * @param ele
		 * @returns
		 */
		getTopObject : function (ele) {
			var deep = 0;
			var oEle = null;
			var win = window;
			if (cwb.ObjExist(ele, win)) {
				oEle = cwb._(ele, win);
			}
			if (!oEle && top.parentCallWin) {
				win = top.parentCallWin;
				if (cwb.ObjExist(ele, win)) {
					oEle = cwb._(ele, win);
				}
			}

			if (!oEle) {
				while (!cwb.ObjExist(ele, win)) {
					deep++;
					win = win.parent;
					if (deep === 5 || win === top) {
						break;
					}
				}
				oEle = cwb._(ele, win);
			}

			return oEle;
		},

		/**
		 * Url校验
		 * @param vUrl
		 * @returns
		 */
		isUrl : function (vUrl) {
			var strRegex = '^((https|http|ftp|rtsp|mms)?://)' + 
				 '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?'+  //ftp的user@
				 '(([0-9]{1,3}.){3}[0-9]{1,3}'+  // IP形式的URL- 199.194.52.184
				 '|' + // 允许IP和DOMAIN（域名）
				 '([0-9a-z_!~*\'()-]+.)*' + // 域名- www.
				 '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' +  // 二级域名
				 '[a-z]{2,6})' + // first level domain- .com or .museum
				 '(:[0-9]{1,4})?' + // 端口- :80
				 '((/?)|'+  // a slash isn't required if there is no file name
				 '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
			var re = new RegExp(strRegex);

			return re.test(vUrl);
		},
		/**
		 * URL中特殊字段处理
		 * @param str
		 * @returns
		 */
		specialUrlField : function (str) {

			if (str.indexOf("#PKID#") > -1) {
				str = str.replace("#PKID#", this.getQueryStr("__PKID"));
			}
			return str;
		},
		/**
		 *
		 * @param vUrl
		 * @param urlList
		 * @param vFilter
		 * @returns
		 */
		UrlArray : function (vUrl, urlList, vFilter) {

			var repeatFilter = "";
			var oQuery;
			var flag=true;
			if (!urlList) {
				urlList = [];
			}
			var Filters = vFilter ? (typeof(vFilter) === "object" ? vFilter : vFilter.split(",")) : [];
			var strFilter = Filters.join(",").toUpperCase();
			if (!vUrl) {
				vUrl = window.location.search.substr(1);
			} //为空、null或undefined 时为当前URL参数

			if (vUrl.indexOf("?") > -1) {
				vUrl = vUrl.split("?")[1];
			}
			if (vUrl.indexOf("&") >= 0) {
				if (vUrl.indexOf("&&") >= 0) {
					//string.replace(/reallyDo/g, replaceWith);
					vUrl = vUrl.replace(new RegExp("&&", 'g'), "&");
				}
				aQuery = vUrl.split("&");
				for (var i = 0; i < aQuery.length; i++) {
					flag = true;
					var sTempQuery = aQuery[i];
					if (sTempQuery.indexOf("=") >= 0) {
						oQuery = sTempQuery.split("=");
						for (var r = 0; r < urlList.length; r++) {
							if (urlList[r].key.toUpperCase() === oQuery[0].toUpperCase()) {
								flag = false;
							}
						}
						if (strFilter.indexOf(oQuery[0].toUpperCase()) > -1) {
							for (var j = 0; j < Filters.length; j++) {
								if (oQuery[0].toUpperCase() === Filters[j].toUpperCase()) {
									flag = false;
								}
							}
						}

						if (flag && oQuery[1] !== "" && oQuery[1].indexOf("#") < 1) {
							if (("," + repeatFilter + ",").indexOf("," + oQuery[0] + ",") < 0) {
								repeatFilter += (repeatFilter === "" ? "" : ",") + oQuery[0];
								urlList.push({
									"key" : oQuery[0],
									"value" : oQuery[1]
								});
							}
						}
					}
				}
			} else {
				if (vUrl.indexOf("=") >= 0) {
					oQuery = vUrl.split("=");
					flag = true;
					for (var s = 0; s < urlList.length; s++) {
						if (urlList[s].key.toUpperCase() === oQuery[0].toUpperCase()) {
							flag = false;
						}
					}
					for (var q = 0; q < Filters.length; q++) {
						if (strFilter.indexOf(oQuery[0].toUpperCase()) > -1) {
							if (oQuery[0].toUpperCase() === Filters[q].toUpperCase()) {
								flag = false;
							}
						}
					}
					if (flag && oQuery[1] !== "" && oQuery[1].indexOf("#") < 1) {
						if (("," + repeatFilter + ",").indexOf("," + oQuery[0] + ",") < 0) {
							repeatFilter += (repeatFilter === "" ? "" : ",") + oQuery[0];
							urlList.push({
								"key" : oQuery[0],
								"value" : oQuery[1]
							});
						}
					}
				}
			}
			//删除过滤条件中的字段

			return urlList;
		},

		installUrl : function (vUrl, urlList) {
			/**
			 * 拼接Url数组
			 * @param vUrl
			 * @param urlList
			 * @returns {String}
			 */
			var vExtUrl = "";
			var temUrl = vUrl.toUpperCase().trim();
			for (var i = 0; i < urlList.length; i++) {
				if (temUrl.indexOf("&" + urlList[i].key + "=") < 0) {
					vExtUrl += "&" + urlList[i].key + "=" + urlList[i].value;
				}
			}
			return vUrl + vExtUrl;
		},

		/**
		 * Url 参数自动解析(Url中替换的参数必须为大写)
		 * @param vUrl
		 * @returns
		 */
		urlParse : function (vUrl) {
			//vUrl=cwb.replaceAll(vUrl,"#"+oUrl.key+"#",oUrl.value);

			var paraList = cwb.UrlArray(null, null, sysvar);
			var oPara = urlList[k].toUpperCase();
			for (var i = 0; i < paraList.length; i++) {
				var oUrl = paraList[i];
				vUrl = cwb.replaceAll(vUrl, "#" + oUrl.key.toUpperCase() + "#", oUrl.value);
			}
			return vUrl;
		},

		strDH : function (str) {
			var newStr = "";
			if (typeof(str) === "string") {
				var aryStr = str.split(",");
				for (var i = 0; i < aryStr.length; i++) {
					if (aryStr[i] !== "") {
						newStr += (newStr === "" ? "" : ",") + aryStr[i];
					}
				}
			} else {
				return str;
			}
			return newStr;
		},

		/**
		 * 禁用选择文本
		 */
		disableSelection : function () {
			if (document.selection) { //IE ,Opera
				if (document.selection.empty){
					document.selection.empty(); //IE
				}else { //Opera
					document.selection = null;
				}
			} else if (window.getSelection) { //FF,Safari
				window.getSelection().removeAllRanges();
			}
		},
		/**
		 *
		 * @param ele
		 * @returns
		 */
		serializeArray : function (ele) {

			var AryEle;
			if (ele.elements) {
				AryEle = cwb.makeArray(ele.elements);
			} else {
				AryEle = ele;
			}
			return cwb.map(AryEle, function (elem, i) {
				//var val = jQuery(elem).val();
				val = cwb.getFieldValue(elem, 2).value;
				return val === null ?
				null :
				cwb.isArray(val) ?
				cwb.map(val, function (val, i) {
					return {
						name : elem.name,
						value : val.replace(rCRLF, "\r\n")
					};
				}) : {
					name : elem.name,
					value : val.replace(rCRLF, "\r\n")
				};
			});
		},

		unLogin : function () {
			//var ele=this instanceof cwb?this:cwb;
			return this.curObj().ajaxExecuted("../../Base/Service/getPageAction.jsp?__action=unlogin", "post", "html", function (data) {
				window.location.href = "../../../login.jsp";
			}, "", false, "", null);
		},
		showQRcode : function (type, id) {
			var content = cwb.replaceAll(location.href, "&", "-|-");
			var vURL = "../../Base/Service/getGridAction.jsp?__action=QRCodeImg&type=" + type + "&id=" + id + "&content=" + content;
			var success = function (data) {
				return false;
			};
			return cwb.ajaxExecuted(vURL, "get", "html", success, "", false, "onload", "");
		},

		showQRImg : function (id, event) {
			cwb.cancelBubble(event);
			var qr = cwb._(id);
			if (qr.style.display === "") {
				qr.style.display = "none";
			} else {
				qr.style.display = "";
			}
		},
		/**
		 * 显示或隐藏帮助信息
		 * @param type
		 */
		changeHelpMessage : function (type) {
			if (type === "0") {
				cwb._("help_content").style.display = "none";
				cwb._("help_triangle").style.display = "none";
			} else if (type === "1") {
				cwb._("help_content").style.display = "";
				cwb._("help_triangle").style.display = "";
			}
		},
		/**
		 * 通过参数控制元素隐藏
		 * @param id
		 * @param UrlParm
		 * @param vV
		 * @param otherId
		 * @param style
		 * @param fnCallBack
		 * @returns {String}
		 */
		setH : function (id, UrlParm, vV, otherId, style, fnCallBack) {
			var strIDs=[];
			if (cwb.getUrlField) {
				var IsParam = cwb.getQueryStr(UrlParm);
				if (id) {
					strIDs = id.split(",");
				}

				if (IsParam === "")
				{
					return "";
				}
					
				if ((IsParam === vV)) {
					if (strIDs) {
						for (var i = 0; i < strIDs.length; i++) {
							document.getElementById(strIDs[i]).style.display = "none";
						}
					} else {
						document.getElementById(id).style.display = "none";
					}
					//改变 otherId 样式
					if (style && document.getElementById(otherId)) {
						var currstyle = document.getElementById(otherId).style;
						if (currstyle.cssText) {
							currstyle.cssText = style;
						} else {
							currstyle = style;
						}
					}
					//回调函数
					if (fnCallBack && fnCallBack instanceof Function) {
						fnCallBack();
					}

				} else if (document.getElementById(id)) {
					if (strIDs) {
						for (var s = 0; s < strIDs.length; s++) {
							document.getElementById(strIDs[s]).style.display = "";
						}
					} else {
						document.getElementById(id).style.display = "";
					}
				}
			}
		}

	});

	cwb.GetQueryString = cwb.getQueryStr;
	/**
	 * URL解析 包含URL 和 页面取值
	 * @param vUrl
	 * @param vType 解析的范围 1=URL,2=PAGE,3=URL+PAGE
	 * @param fmVType 指定页面取值范围  1=ID,2=Value
	 * @param index
	 * @returns
	 */
	cwb.urlParse2 = function (vUrl, vType, fmVType, index) {
		var
		oUrlParaV,
		r,
		tmpR,
		vT,
		eleId;
		reg = new RegExp("(\\#{1})[a-zA-Z\\_]*(\\#{1})", "ig"),
		paraList = this.UrlArray(vUrl, null, null);

		vType = this.getInt(vType, 0);
		fmVType = this.getStr(fmVType, "");

		for (var i = 0; i < paraList.length; i++) {
			oUrlParaV = paraList[i].value; //.toUpperCase()
			if (oUrlParaV.indexOf("#") > -1) {
				r = oUrlParaV.match(reg);
				for (var s = 0; s < r.length; s++) {
					tmpR = r[s].replace("#", "").replace("#", "");
					if (tmpR !== "") {
						vT = this.getQueryStr(tmpR);
						if (vT === "") {
							eleId = tmpR + (index ? "_" + (index > 0 ? index - 1 : 0) : "");
							if (!this.ObjExist(eleId)) {
								eleId = tmpR;
							}
							if (this.ObjExist(eleId) && (vType === 2 || vType === 3) && vT === "") {
								vT = this.getFieldValue(eleId, "2").id;
								if (("," + fmVType + ",").indexOf("," + i + ",") > -1) { //fmVType 指定位置取值方式
									vT = this.getFieldValue(eleId, "2").value;
								}
							}
						}
						oUrlParaV = oUrlParaV.replace("#" + tmpR + "#", vT);
					}
				}
				paraList[i].value = oUrlParaV;
			}
		}
		if (vUrl.indexOf("?") > -1) {
			vUrl = vUrl.substr(0, vUrl.indexOf("?") + 1);
		}
		return this.installUrl(vUrl, paraList);
	};
	/**
	 * 消息
	 * @param vMsg
	 * @returns
	 */
	cwb.message = function (vMsg) {
		return this.showNews(vMsg, library.message, 270, 70, 1200, {
			"mack" : false
		});
	};
	/**
	 * 全局参数URL继承
	 * @param vUrl
	 * @returns {String}
	 */
	cwb.globalSysUrlParam = function (vUrl) {
		var
		SpecialParam = "charset",
		execParam = "",
		flag = false;
		for (var i = 0; i < globalSysUrl.length; i++) {
			//功能：Url中有globalSysUrl[?] 替换值,没有Url附加参数globalSysUrl[?]
			if (("," + SpecialParam + ",").indexOf("," + globalSysUrl[i] + ",") > -1) {
				execParam += (execParam === "" ? "" : ",") + globalSysUrl[i];
			} else {
				vUrl = this.UrlParams(vUrl, globalSysUrl[i], this.getQueryStr(globalSysUrl[i]));
			}
		}

		//特殊参数
		if (execParam.indexOf("charset") > -1) {
			//功能：Url中有charset 替换值,没有Url附加参数charset
			vUrl = this.UrlParams(vUrl, "charset", this.charset);
		}

		return vUrl;
	};
	/**
	 * Url管理 （替换Url参数,过滤系统参数和指定参数,继承父类参数,全局参数）
	 * @param vUrl
	 * @param vExtUrl
	 * @param vOption
	 * @param vFilter 过滤参数
	 * @param vType 解析的范围 1=URL,2=PAGE,3=URL+PAGE
	 * @param fmVType 指定页面取值范围 1=ID,2=Value
	 * @param index
	 * @returns
	 */
	cwb.UrlManage = function (vUrl, vExtUrl, vOption, vFilter, vType, fmVType, index) {
		var strFilter = vFilter ?
			sysvar :
			this.strDH((sysvar.join(",")) + "," + vFilter);
		//Url扩展
		vUrl = !vExtUrl ?
			vUrl :
			this.UrlParaJoin(vUrl, vExtUrl);

		vUrl = this.specialUrlField(vUrl);
		//Url中有替换时在替换
		if (vUrl.indexOf("#") > -1) {
			vUrl = this.urlParse2(vUrl, vType, fmVType, index);
		}
		//参数继承
		if (vOption && vOption.indexOf("999") > -1) {
			vUrl = this.installUrl(vUrl, this.UrlArray(null, null, strFilter));
		}

		if (vOption && vOption.indexOf("888") > -1) {
			vUrl = this.custBtnAction(vUrl);
		}

		return this.globalSysUrlParam(vUrl);
	};

	cwb.custBtnAction = function (vUrl) {
		if (vUrl.contains("?")) {
			vUrl = "../../Base/Service/getBtnAction.jsp?__action=custBtn&" + vUrl.split("?")[1];
		} else {
			vUrl = "../../Base/Service/getBtnAction.jsp?__action=custBtn&" + vUrl;
		}
		return vUrl;
	};

	cwb.namespace = function (objApp, ns_string) {
		var parts = ns_string.split('.'),
		parent = objApp,
		i;

		// 默认如果第一个节点是MYAPP的话，就忽略掉，比如MYAPP.ModuleA
		if (eval(parts[0]) === objApp) {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i += 1) {
			// 如果属性不存在，就创建
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	//获得某月的天数
	cwb.getMonthDays = function (myMonth) {
		//http://www.jb51.net/article/43630.htm
		var now = new Date(); //当前日期
		var nowYear = now.getFullYear(); //当前年
		var monthStartDate = new Date(nowYear, myMonth, 1);
		var monthEndDate = new Date(nowYear, myMonth + 1, 1);
		var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	};
	//获得本季度的开端月份
	cwb.getQuarterStartMonth = function () {
		var now = new Date(); //当前日期
		var nowMonth = now.getMonth() + 1; //当前月
		var quarterStartMonth = 1;
		if (nowMonth < 4) {
			quarterStartMonth = 1;
		}
		if (3 < nowMonth && nowMonth < 7) {
			quarterStartMonth = 4;
		}
		if (6 < nowMonth && nowMonth < 10) {
			quarterStartMonth = 7;
		}
		if (nowMonth > 9) {
			quarterStartMonth = 10;
		}
		return quarterStartMonth;
	};

	//格局化日期：yyyy-MM-dd
	cwb.getFormatDate = function (date) {
		var myyear = date.getFullYear();
		var mymonth = date.getMonth() + 1;
		var myweekday = date.getDate();
		if (mymonth < 10) {
			mymonth = "0" + mymonth;
		}
		if (myweekday < 10) {
			myweekday = "0" + myweekday;
		}
		return (myyear + "-" + mymonth + "-" + myweekday);
	};
	/*
	取得当前日期相对日期，
	昨天："+getDateStr(-1)
	明天："+getDateStr(1)
	 */
	cwb.getDateStr = function (iOffDay, vFormate) {
		var dd = new Date();
		dd.setDate(dd.getDate() + parseInt(iOffDay)); //dd.getDate()+ 获取iOffDay天后的日期
		var y = dd.getFullYear();

		var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
		var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
		return y + "-" + m + "-" + d;
	};

	//注册全局方法
	cwb.setGlobal("unLogin,setH,curObj,showQRcode,showQRImg");

	//cwb.fn.init.extend=cwb.extend;
	//cwb.fn.init.extend(cwb);
	//cwb=cwb;
	//cwb.fn.extend(cwb);
	window.cwb = cwb;
	//window.curObj=cwb.curObj;


})(window);

window.CWB = cwb;

//window.unLogin=cwb.unLogin;


/**本地缓存*/
var Cache = {
	set : function (key, value) {
		if (navigator.userAgent.indexOf("MSIE") > 0) { //是否是IE浏览器  ：navigator.userAgent是描述用户代理信息。ie11已经不支持了，ie11不在包含MSIE字段
		} else {
			if (window.localStorage) {
				localStorage[key] = value;
			}
		}
	},
	get : function (key) {
		return window.localStorage ? (localStorage[key] || "") : "";
	}
};

var browser = cwb.getBrowser();

var Sbrowser = cwb.getBrowser("name");
//==================================================================================================
/**
 *
 * @param from
 * @param to
 * @returns
 */
Array.prototype.remove = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

String.prototype.contains = function (str) {
	return (this.indexOf(str) >= 0);
};
//IE也没有trim
String.prototype.trim = function () {
	// 用正则表达式将前后空格
	// 用空字符串替代。
	// 正则  /(^\s*)|(\s*$)/g
	// 正则 /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};

//IE木有indexOf函数..
if (!Array.indexOf) {
	Array.prototype.indexOf = function (obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
}
//数组去重
Array.prototype.unique = function () {
	var n = []; //一个新的临时数组
	for (var i = 0; i < this.length; i++) //遍历当前数组
	{
		if (n.indexOf(this[i]) === -1)
		{
			n.push(this[i]);
		}
	
	}
	return n;
};
//====================================================================================================

/*
 *2015-12-14 未知调用，暂不删除
function __clickHidInput(excObjID) {
if (cwb.ObjExist(excObjID)) {
cwb._(excObjID).onclick();
}
return;
}*/

function sysDataSource(obj) {
	var strDataSource = cwb.getQueryStr("__datasource");
	if (strDataSource === "") {
		window.location.href = window.location.href + "&__datasource=1";
	} else if (strDataSource === "1") {
		window.location.href = cwb.UrlParams(window.location.href, "__datasource", "0");
	} else if (strDataSource === "0") {
		window.location.href = cwb.UrlParamDel(window.location.href, "__datasource");
	}
}

//定时触发

function removeObjAttr(obj) {
	try {
		if (obj.removeAttribute) {
			obj.style.removeAttribute("position");
		} else if (obj.removeProperty) {
			obj.style.removeProperty("position");
		}
	} catch (e) {}
}

//===================error=============================

//=====error===
//删除数组中某位置的元素


//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"M+" : this.getMonth() + 1, //月份
		"d+" : this.getDate(), //日
		"h+" : this.getHours(), //小时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度
		"S" : this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o){
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)  ) );
		}
	}
	return fmt;
};
//====================================================
//DDS
function __ResizeIframe2(id) {

	//使用注意： body {margin:0;padding:0}
	//cwb.setoverflow(id);
	cwb.autoHeight(id); //设置当前Iframe 高度
	cwb.autoFrameBody(id, 5); //设置 Iframe 里body 高度
}

