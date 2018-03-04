

function ajax(obj){
	var xhr = (function(){
		if(typeof ActiveXObject != 'undefined'){
			var version = ['MSXML2.XMLHttp.6.0',
							'MSXML2.XMLHttp.3.0',
							'MSXML2.XMLHttp'
			];
			for(var i = 0; i < version.length; i++){
				try{
					return new ActiveXObject(version[i])
				}catch(e){};
			}
		}else if(typeof XMLHttpRequest != 'undefined')
			return new XMLHttpRequest();

	})();
	var url = obj.url + '?rand=' + Math.random();
	var data = (function(data){
		var arr = [];
		for(var i in data){
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}

		return arr.join('&');
	})(obj.data);
	//alert(data);
	var async = obj.async;
	var method = obj.method;
	if(method === 'get')
		url += url.indexOf('?') == -1 ? '?' + data : '&' + data;
	if(async === true){//异步
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					obj.success(xhr.responseText);
				}else{
					alert('数据返回失败，失败状态:' + xhr.status + '状态信息:' + xhr.statusText);
				}
			}
		}
	}
	//alert('失败');
	xhr.open(method, url, async);
	if(method === 'get'){
		xhr.send(null);
	}else if(method ==='post'){
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	if(async === false){//同步
		if(xhr.status == 200){
			obj.success(xhr.responseText);
		}else{
			alert('数据返回失败，失败状态:' + xhr.status + '状态信息:' + xhr.statusText);
		}
	}
}
