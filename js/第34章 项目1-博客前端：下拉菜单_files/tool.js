//浏览器检测
(function(){
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();
	//alert(ua);
	var s;
	(s = ua.match(/msie\s([\d\.]+)/))?window.sys.ie = s[1]:((s = ua.match(/firefox\/([\d\.]+)/))?window.sys.firefox  = s[1]:((s = ua.match(/chrome\/([\d\.]+)/))?window.sys.chrome  = s[1]:((s = ua.match(/opr\/([\d\.]+)/))?window.sys.opera  = s[1]:0)))
	if(s = ua.match(/webkit\/([\d\.]+)/)){
		window.sys.webkit = s[1];
		//alert(sys.webkit);
	}
})()

//DOM加载
function addDomLoaded(fn){
	var flag = false;
	var timer = null;
	function doReady(){
		//alert(flag);
		if(flag == true){
			if(timer){
			clearInterval(timer);
			}
			return;
		}
		fn();
		flag = true;	
	}
	if((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit <525)){//低版本浏览器
		timer = setInterval(function(){
		if(/loaded|complete/.test(document.readyState)){
			doReady();	
			}
		}, 1);
	}else if(document.addEventListener){//W3C
		addEvent(document, 'DOMContentLoaded', function(){
		fn();
		removeEvent(document, 'DOMContentLoaded', arguments[0].callee);
		});
	}else if(sys.ie && sys.ie < 9){//IE6 7 8 
		var timer = setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				fn();
			}catch(error){};
		});
	}
	
}

//跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth != "undefined"){//DOM
		return{
			width: window.innerWidth,
			height: window.innerHeight
		}
	}else{//IE
		return{
			width: document.documentElement.cilentWidth,
			height: document.documentElement.clientHeight
		}
	}
	
}

//跨浏览器设置css规则
function insertRule(sheet, selectorText, cssText, position){
	if(typeof sheet.insertRule != 'undefined'){//W3C
		sheet.insertRule(selectorText+'{'+cssText+'}', position);
	}else if(typeof sheet.insertRule != 'undefined'){//IE
		sheet.addRule(selectorText, cssText, position);	
	}
}

function deleteRule(sheet, num){
	if(typeof sheet.deleteRule != 'undefined'){
		sheet.deleteRule(num);
	}else if(typeof sheet.removeRule != 'undefined'){
		sheet.removeRule(num);
	}
}

//判断class是否存在
function hasClass(ele, className){
	return ele.className.match(new RegExp('(\\s|^)'+ className + '(\\s|$)'));

}
//跨浏览器获取滚动条位置
function getScroll(){
	return {
		top: document.documentElement.scrollTop || document.body.scrollTop,
		left: document.documentElement.scrollLeft || document.body.scrollLeft
	}
}

//获取css属性值
function getStyle(ele, attr){
	if(typeof window.getComputedStyle != 'undefined'){
			return window.getComputedStyle(ele, null)[attr];
		}else if(ele.currentStyle != 'undefined'){
			return ele.currentStyle[attr];
		}
}

//获取事件对象
function getEvent(event){
	return event ? event : window.event;
}

//
function getText(ele){
	if(typeof ele.textContent == 'string')return ele.textContent;
	else return ele.innerText;
}

function setText(ele, text){
	if(typeof ele.textContent == 'string')ele.textContent = text;
	else ele.innerText = text;
}

function preDefa(e){
	if(typeof e.preventDefault != 'undefined'){//W3C
		e.preventDefault();
	}else{//IE
		e.returnValue = false;
	}
}

//绑定事件
function addEvent(ob, e, fn){
	if(typeof addEventListener != "undefined"){//DOM
		//alert("DOM");
		ob.addEventListener(e, fn, false);
	}else if (typeof attachEvent != "undefined"){//IE
		//alert("IE");
		if(!ob.events)ob.events = {};
		//第一次执行
		if(!ob.events[e]){
			ob.events[e] = [];
			if(ob['on' + e]){
				ob.events[e][0] = ob['on'+e];
			}
		}else if(addEvent.equal(ob.events[e], fn)){
				//alert(addEvent.equal(ob.events[e], fn));
				return false;
		}
		ob.events[e][addEvent.id++] = fn;
		ob['on' + e] = addEvent.exec;	
	}

		/*
		ob.attachEvent('on' + e , function(){
			fn.call(ob, window.event);
		});
		*///attachEvent函数可直接接收事件对象e, 无需window.event

}
addEvent.id = 1;

addEvent.equal = function(es, fn){
	for(var i in es){
		if(es[i] == fn){
			return true;
		}
	}
	return false;
}

addEvent.exec = function(event){
	event = event || addEvent.fix(window.event);//event的兼容
	//alert(this);
	es = this.events[event.type];
	for(var i in es){
		es[i].call(this, event);//this的兼容
	}
}


addEvent.fix = function(e){
	e.preventDefault = addEvent.fix.preventDefault;
	e.stopPropogation = addEvent.fix.stopPropogation;
	e.target = e.srcElement;
	return e;
}

addEvent.fix.preventDefault = function(){
	this.returnValue = false;
	
}

addEvent.fix.stopPropogation = function(){
	this.cancelBubble = true;
}
//解除绑定事件
function removeEvent(ob, e, fn){
	if (typeof ob.detachEvent != "undefined"){//IE
		for(var i in ob.events[e]){
			if(ob.events[e][i] == fn){
				delete ob.events[e][i]
			}
		}
		/*
		ob['on' + e] = function(){
			for(var i in ob.events[e]){
				ob.events[e][i]();
			}	
		}
		*/
	}else if(typeof ob.removeEventListener != "undefined"){//DOM
		ob.removeEventListener(e, fn, false);
	}
		/*
		for(var i in ob.events[e]){
			alert(i);
		}
		*/
}
//除去空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function inArray(array, value){
	for(var i in array){
		if(array[i] === value)return true; 
	}
	return false;
}

function offsetTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent; while (parent !== null) {
	top += parent.offsetTop;
	parent = parent.offsetParent; }
	return top; 
}

function prevIndex(current, parent){
	var len = parent.children.length;
	return parseInt(current) == 0 ? len-1 : parseInt(current) - 1;
}

function nextIndex(current, parent){
	var len = parent.children.length;
	return parseInt(current) == len-1 ?  0 : parseInt(current) + 1;
}

//cookie
function setCookie(name, value, expiredays){
	var day = new Date();
	day.setDate(day.getDate()+expiredays);
	document.cookie = name + '=' + encodeURIComponent(value) + (expiredays == null ? '' : ';expires=' + day.toGMTString());
}

function getCookie(name){
	if(document.cookie.length > 0){
		var start = document.cookie.indexOf(name + '=');
		if(start != -1){
			start = start + name.length + 1;
			var end = document.cookie.indexOf(';', start);
			if(end == -1)end = document.cookie.length;
			return unescape(document.cookie.substring(start, end));

		}
	}
	return '';
}
