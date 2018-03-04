
var ob = function(_this){
	return new Base(_this);
};
function Base(args){
	this.elements=[];
	if(args != undefined){
		if(typeof args == 'string'){
			//cssÄ£Ê½ÏÂµÄ²ã´Î½á¹¹
			if(args.indexOf(' ') != -1){
				ele = args.split(' ');
				var child = [];
				var parent = [];
				for(var i=0; i<ele.length;i++){
					if(parent.length == 0){
						parent.push(document);
					}
					switch(ele[i].charAt(0)){
						case '#':
							child = [];
							child.push(this.getId(ele[i].substring(1)));
							parent = child;
							break;
						case '.':
							child = [];
							//alert(parent.length);
							for(var j = 0; j < parent.length; j++){
								tmp = this.getClass(ele[i].substring(1), parent[j]);
								for(var k = 0; k < tmp.length; k++)
									child.push(tmp[k]);
							}
							parent = child;
							break;
						default:
							child = [];
							for(var j = 0; j < parent.length; j++){
								//alert(parent[j]);
								tmp = this.getTagName(ele[i], parent[j]);
								for(var k = 0; k < tmp.length; k++)
									child.push(tmp[k]);
							}
							parent = child;

					}
				}
				//alert(child.length);
				this.elements = child;
				
				
			}else{//findÄ£Ê½ÏÂµÄ²ã´Î½á¹¹
				switch(args.charAt(0)){
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args.substring(0));
					
				}
			}
			
		}else if(typeof args == 'object'){
			this.elements[0] = args;
		}else if(typeof args == 'function'){
			this.ready(args);
		}
	}
	
}

Base.prototype.ready = function(fn){
		addDomLoaded(fn);
}

Base.prototype.find = function(str){
	var child = [];
	//alert(this.elements.length);
	for(var i=0; i<this.elements.length;i++){
		switch(str.charAt(0)){
			case '#':
				child.push(this.getId(str.substring(1)));
				break;
			case '.':
				tmp = this.getClass(str.substring(1), this.elements[i]);
				//alert(tmp.length);
				for(var j=0; j<tmp.length;j++){
					child.push(tmp[j]);
				}
				break;
			default:
				tmp = this.getTagName(str.substring(0), this.elements[i]);
				for(var j=0; j<tmp.length;j++){
					child.push(tmp[j]);
				}
		}
		
		
	}
	this.elements = child;
	return this;
	
}

Base.prototype.getId = function(id){
	return document.getElementById(id);
}

Base.prototype.getName = function(name){
	var names = document.getElementsByName(name);
	for(var i=0; i<ele.length;i++){
		this.elements.push(names[i]);
	 }
	return this;
}

Base.prototype.getTagName = function(TagName, parentName){
	var node = null;
	if(arguments.length == 2){
		node = parentName;
	}else{
		node = document;
	}
	return node.getElementsByTagName(TagName);
}

Base.prototype.getClass = function(className, idName){
	var node = null;
	if(arguments.length == 2){
		node = idName;
		//alert(11);
	}else{
		node = document;
		//alert(22);
	}
	//alert(node);
	var all = node.getElementsByTagName('*');
	var tmpClass = [];
	for(var i = 0; i<all.length; i++){
		if(new RegExp('(\\s|^)'+ className + '(\\s|$)').test(all[i].className)){
			tmpClass.push(all[i]);
		}
	}
	return tmpClass;
}
//»ñÈ¡²¢·µ»Ø½Úµã
Base.prototype.getElement = function(num){
	return this.elements[num];
}

//»ñÈ¡½Úµã£¬·µ»Øµ±Ç°¶ÔÏó
Base.prototype.getEle = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements.push(element);
	return this;
	
}
//»ñÈ¡Ê×¸ö½Úµã
Base.prototype.first = function(){
	return this.elements[0];
}

//»ñÈ¡Ä©Î²½Úµã
Base.prototype.last = function(){
	return this.elements[this.elements.length-1];
}

//获取下一个节点
Base.prototype.next = function(){
	for(var i=0; i<this.elements.length;i++){
		this.elements[i] = this.elements[i].nextSibling;
		if(this.elements[i] == null)throw new Error('找不到下一个同级节点');
		else if(this.elements[i].nodeType == 3)this.next();

	}
	return this;
}

Base.prototype.length = function(){
	return this.elements.length;
}

Base.prototype.ind = function(){
	var child = this.elements[0].parentNode.children;
	for(var i = 0; i <= child.length; i++)
		if(child[i] == this.elements[0])return i;
}

Base.prototype.attr = function(attr, value){
	//alert(this.elements[0]);
	for(var i=0; i<this.elements.length;i++){
		if(arguments.length == 1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length == 2){
			this.elements[i].setAttribute(attr, value);
		}
	}
	return this;

}

//获取表单中元素
Base.prototype.form = function(name){
	var y = [];
	for(var i=0; i<this.elements.length;i++){
		y.push(this.elements[i][name]);
	}
	this.elements = [];
	for(var j=0; j<y.length;j++){
		this.elements.push(y[j]);
	}
	return this;
}

Base.prototype.css = function(attr, value){
	for(var i=0; i<this.elements.length;i++){
		if(arguments.length == 1){
			return getStyle(this.elements[i], attr);
		}
		this.elements[i].style[attr]=value;
	}
	return this;
}

Base.prototype.html = function(text){
	for(var i = 0; i<this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = text;
	}
	return this;
}

Base.prototype.value = function(text){
	for(var i = 0; i<this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].value;
		}
		this.elements[i].value = text;
	}
	return this;
}

Base.prototype.text = function(text){
	for(var i = 0; i<this.elements.length; i++){
		if(arguments.length == 0){
			return getText(this.elements[i]);
		}
		setText(this.elements[i], text);
	}
	return this;
}

Base.prototype.click = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		//this.elements[i].onclick = fn;
		//alert(this.elements[i]);
		addEvent(this.elements[i], 'click', fn);
	}
	return this;
}

Base.prototype.bind = function(eve, fn){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i], eve, fn);
	}
	return this;
}


Base.prototype.addClass = function(className){
	for(var i = 0; i < this.elements.length; i++){
		if(!hasClass(this.elements[i], className)){
			this.elements[i].className +=" " + className;	
		}
	}
	return this;
}

Base.prototype.deleteClass = function(className){
	for(var i = 0; i < this.elements.length; i++){
		if(hasClass(this.elements[i], className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+ className + '(\\s|$)'), ' ');	
		}

	}
	return this;
}

Base.prototype.addRule = function(ind, selectorText, cssText, position){
	var sheet = document.styleSheets[ind];
	insertRule(sheet, selectorText, cssText, position);
	return this;
}
 
Base.prototype.removeRule = function(ind, num){
	var sheet = document.styleSheets[ind];
	deleteRule(sheet, num);
	return this;
}

//Êó±êÒÆÈëÒÆ³ö·½·¨
Base.prototype.hover = function(over, out){
	for(var i = 0; i < this.elements.length; i++){
			addEvent(this.elements[i], 'mouseover', over);
			addEvent(this.elements[i], 'mouseout', out);
	}
	return this;
}

//ÏÔÊ¾
Base.prototype.show = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}

//Òþ²Ø
Base.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}


//ÉèÖÃ´°¿Ú¾ÓÖÐ
Base.prototype.center = function(height, width){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.top = (getInner().height - height)/2 + 30 + getScroll().top + 'px';
		this.elements[i].style.left = (getInner().width - width) / 2 + getScroll().left + 'px';
	}
	return this;
}

Base.prototype.resize = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		var ele = this.elements[i];
		window.onresize = function(){
			fn();
			if(ele.offsetLeft >	(getInner().width + getScroll().left - ele.offsetWidth))
			{
				ele.style.left = getInner().width + getScroll().left - ele.offsetWidth + 'px';
			}
			if(ele.offsetTop > (getInner().height + getScroll().top - ele.offsetHeight))
			{
				ele.style.top = getInner().height + getScroll().top - ele.offsetHeight + 'px';
			}
		}
		
	}
	return this;
}

Base.prototype.opacity = function(value){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.opacity = value/100;
		this.elements[i].style.filter = 'alpha(' + value+ ')';
	}
	return this;
}
//ËøÆÁ
Base.prototype.lock = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "block";
		this.elements[i].style.width = getInner().width + getScroll().left + 'px';
		this.elements[i].style.height = getInner().height + getScroll().top + 'px';
		parseFloat(sys.firefox) < 4 ? document.body.style.overflow = "hidden" : document.documentElement.style.overflow = "hidden" ;
	}
	return this;
}

//ÉèÖÃ»­²¼
Base.prototype.unlock = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "none";
		parseFloat(sys.firefox) < 4 ? document.body.style.overflow = "auto" : document.documentElement.style.overflow = "auto" ;
	}
	return this;
}

Base.prototype.extend = function(name, fn){
	Base.prototype[name] = fn;
}


Base.prototype.animate = function(obj){
	for(var i = 0; i < this.elements.length; i++){
		var ele = this.elements[i];
		
		var attr = obj['attr'] =='x' ? 'left' : obj['attr'] == 'y'? 'top' : obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr']  : 'left';
		var start = obj['start'] != undefined ? obj['start']: attr == 'opacity' ? parseFloat(getStyle(ele, attr)) * 100 : parseInt(getStyle(ele, attr));
		var step = obj['step'] != undefined ? obj['step']:10;

		var speed = obj['speed'] != undefined ? obj['speed'] : 6;
		var type = obj['type'] == 0? 'constant' : 'buffer';
		var t = obj['t'] != undefined ? obj['t']:50;
		var alter = obj['alter'];
		var target = obj['target'];
		var mul = obj['mul'];
		//alert(target);
		if(alter != undefined && target == undefined){
			target = alter + start;
		}else if(alter == undefined && target == undefined && mul == undefined){
			throw new Error('alter»òtargetÖÁÉÙÖ¸¶¨ÆäÖÐÒ»¸ö£¡');
		}
		if(target < start)step = -step;
		if(attr == 'opacity'){
			ele.style.opacity = start / 100;
			//alert(start/100);
			ele.style.filter = 'alpha(opacity = ' + start + ')';
		}else{
			ele.style[attr] = start + 'px';
		}

		if(mul == undefined){
			mul = {};
			mul[attr] = target;
		}

		clearInterval(ele.timer);
		ele.timer = setInterval(function(){
			var flag = true;
			for(var i in mul){
				attr = i =='x' ? 'left' : i == 'y'? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
				target = parseInt(mul[i]);
				if(type == 'buffer'){
					t = attr == 'opacity' ? (target - parseFloat(getStyle(ele, attr))* 100) / speed : (target - parseInt(getStyle(ele, attr))) / speed ;
					step = t > 0 ? Math.ceil(t) : Math.floor(t);
				}
				tmp = attr == 'opacity' ? parseFloat(getStyle(ele, attr)) * 100 + step : parseInt(getStyle(ele, attr)) + step;
				//alert(tmp);
				if((step > 0 && tmp >= target) || (step < 0 && tmp <= target) || step == 0){
					//document.getElementById('record').innerHTML +=  'stop' + '<br />';
					if(attr == 'opacity'){
						ele.style.opacity = target / 100 ;
						ele.style.filter = 'alpha(opacity = ' + target + ')';
					}else{
						ele.style[attr] = target + 'px';
					}
				}else{
					//document.getElementById('record').innerHTML +=  'move'+ '<br />';
					if(attr == 'opacity'){
						ele.style.opacity = tmp / 100 ;
						ele.style.filter = 'alpha(opacity = ' + tmp + ')';
					}else{
						//alert(tmp);
						ele.style[attr] = tmp + 'px';
					}
					flag = false;
				}

			//document.getElementById('record').innerHTML +=  i + '--' + ele.style[attr] + '--' +target + '--'+ flag + '<br />';
			} 
			if(flag){
				clearInterval(ele.timer);
				if(obj.fn != undefined)obj.fn();				
			}

		
		},t)
	}
	return this;
	
}

//切换
Base.prototype.toggle = function(){
	for(var i = 0; i < this.elements.length; i++){
		(function tog(ele, args){
			var count = 0;
			addEvent(ele, 'click', function(){
					args[count++ % args.length].call(this);
					document.getElementsByClassName('other')[0].innerHTML +=  count + '<br />';
				})
		})(this.elements[i], arguments)
		
	}
	return this;
}


Base.prototype.serialize = function(){
	for(var i = 0; i < this.elements.length; i++){
		var form = this.elements[i];
		var parts = {};
		var field = null;
		for(var j = 0; j < form.elements.length; j++){
			field = form.elements[j];
			//alert(field.type);
			switch(field.type){
				case 'undefined':
				case 'reset':
				case 'submit':
				case 'file':
				case 'button':
					break;
				case 'select-one':
				case 'select-multiple':
					for(var k = 0; k < field.options.length; k++){
						var option = field.options[k];
						if(option.selected){
							parts[field.name] = option.value;
						}
					}
					break;
				case 'radio':
				case 'checkbox':
					if(! field.checked)break;
				default:
					parts[field.name] = field.value;

			}
		}
		return parts;
	}

}
