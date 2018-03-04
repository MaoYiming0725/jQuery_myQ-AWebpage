$(function(){
	$('#search_button').button({
		icon:'ui-icon-search'

	});
	$('#ques_button').button({
		icon:'ui-icon-lightbulb'

	}).click(function(){
		if($.cookie('user')){
			$('#ques').dialog('open');
		}else{
			$('#error').dialog('open');
			setTimeout(function(){
				$('#error').dialog('close');
				$('#login').dialog('open');
			},1000);
		}
	});

	$('.uEditorCustom').uEditor();

	function logout(){
		$('#header_main #member, #header_main #logout').hide();
		$('#header_main #reg_a, #header_main #log_a').show();
	}

	function login(){
		$('#header_main #member, #header_main #logout').show();
		$('#header_main #reg_a, #header_main #log_a').hide();
		$('#header_main #member').html($.cookie('user'));
	}

	if($.cookie('user')){
		login();
	}else{
		logout();
	}

	$('#logout').click(function(){
		$.removeCookie('user');
		window.location.href = window.location.href;
	});

	$('#reg').dialog({
		autoOpen:false,
		width:320,
		height:340,
		modal:true,
		resizable:false,
		buttons:{
			'提交': function(){
				$(this).submit();
			}
		}
	}).validate({
		wrapper:'li',
		errorLabelContainer:'#reg_errors',
		showErrors:function(errorMap, errorList){
			var errors = this.numberOfInvalids();
			if(errors > 0){
				$('#reg').dialog('option', 'height', 340 + errors * 20);
			}else{
				$('#reg').dialog('option', 'height', 340);
			};
			this.defaultShowErrors();
		},
		highlight:function(element, errorClass){
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight:function(element, errorClass){
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('').addClass('succ');
		},
		submitHandler:function(form){
			//提交按钮使用submit()，因此用ajaxSubmit()

			$('#reg').ajaxSubmit({
				url: 'add_user.php',
				type: 'POST',
				beforeSubmit: function(){
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').dialog('open');
				},
				success: function(responseText, statusText){
					$('#reg').dialog('widget').find('button').eq(1).button('enable');
					$('#loading').html('数据提交成功...').css('background','url(img/success.gif) no-repeat 20px center');
					$.cookie('user', $('#reg #user').val());
					setTimeout(function(){
						$('#loading').dialog('close');
						$('#reg').dialog('close');
						$('#reg').resetForm();
						$('#loading').html('数据交互中...').css('background','url(img/loading.gif) no-repeat 20px center');
						$('#reg .star').html('*').removeClass('succ');
						login();
					}, 1000);
				},
				//resetForm: true,
			});
		},
		rules:{
			user:{
				required: true,
				minlength:2,
				remote:{
					url: 'is_user.php',
					type: 'POST',
				},
			},
			pass:{
				required: true,
				minlength:6,
			},
		  email:{
				required: true,
				email:true,
			},
			birth:{
				date:true,
			},
		},
		messages:{
			user:{
				required: '帐号不得为空！',
				minlength: jQuery.validator.format('帐号不得小于{0}位！'),
				remote: '帐号已占用！',
			},
			pass:{
				required: '密码不得为空！',
				minlength: jQuery.validator.format('密码不得小于{0}位！'),
			},
			email:{
				required: '邮箱不得为空！',
				email: '请输入正确的邮箱格式！',
			},
			birth:{
				date:'请输入正确的日期！',
			},
		},

	});
	$('#reg_a').click(function(){
		$('#reg').dialog('open');
	});

	$('#reg .sex input[type=radio]').checkboxradio({
		icon:false
	});

	$('#birth').datepicker({
		dateFormat: "yy-mm-dd",
		maxDate:0,
		changeMonth:true,
		changeYear:true,
		yearSuffix:'',
	});


	$('.ui-datepicker-today .ui-state-highlight').css('color', 'red');
	//$('.ui-datepicker-header').css('background', 'url(img/ui_header_bg.png)');

	$('#email').autocomplete({
		source:function(request, response){
			//alert('');
			var hosts = ['qq.com','163.com', '263.com', 'gmail.com', 'hotmail.com'],
				term = request.term,
				name = '',//用户名
				host = '',//域名
				ix = term.indexOf('@'),//
				result = [];
				result.push(term);
				if(ix == -1){
					name = term;
				}else if(ix > -1){
					name = term.slice(0, ix);
					host = term.slice(ix+1);
				}

				var findedhost = name && host ? $.grep(hosts, function(value, index){
					return value.indexOf(host) > -1;
				}) : hosts;

				findedResult = $.map(findedhost, function(value, index){
					return name + '@' + value;
				})
				//alert(findedResult);
				result = result.concat(findedResult);
				//alert(result);
				//alert(result);
				response(result);

		},

		classes:{
			'ui-autocomplete':'custom-autocomplete'
		},
		delay:0,
		autoFocus:false,
		minLength:2

	});
	$('#email').autocomplete('search','a');
	//$('.ui-tooltip').css('color', 'red');

	$('#login').dialog({
		autoOpen:false,
		width:320,
		height:240,
		modal:true,
		resizable:false,
		buttons:{
			'提交': function(){
				$(this).submit();
			}
		}
	}).validate({
		wrapper:'li',
		errorLabelContainer:'#login_errors',
		showErrors:function(errorMap, errorList){
			var errors = this.numberOfInvalids();
			if(errors > 0){
				$('#login').dialog('option', 'height', 240 + errors * 20);
			}else{
				$('#login').dialog('option', 'height', 240);
			};
			this.defaultShowErrors();
		},
		highlight:function(element, errorClass){
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight:function(element, errorClass){
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('').addClass('succ');
		},
		submitHandler:function(form){
			//提交按钮使用submit()，因此用ajaxSubmit()

			$('#login').ajaxSubmit({
				url: 'login.php',
				type: 'POST',
				beforeSubmit: function(){
					$('#login').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').dialog('open');
				},
				success: function(responseText, statusText){
					$('#login').dialog('widget').find('button').eq(1).button('enable');
					$('#loading').html('数据提交成功...').css('background','url(img/success.gif) no-repeat 20px center');

					if($('#expires').is(':checked')){
						$.cookie('user', $('#login_user').val(),{
							expires: 7,
						});
					}else{
						$.cookie('user', $('#login_user').val());
					}
					setTimeout(function(){
						$('#loading').dialog('close');
						$('#login').dialog('close');
						$('#login').resetForm();
						$('#loading').html('数据交互中...').css('background','url(img/loading.gif) no-repeat 20px center');
						$('#login .star').html('*').removeClass('succ');
						login();
					}, 1000);
				},
				//resetForm: true,
			});
		},
		rules:{
			login_user:{
				required: true,
				minlength:2,

			},
			login_pass:{
				required: true,
				minlength:6,
				remote:{
					url: 'login.php',
					type: 'POST',
					data: {
						login_user: function(){
							return $('#login_user').val();
						}
					}
				},
			},
		},
		messages:{
			login_user:{
				required: '帐号不得为空！',
				minlength: jQuery.validator.format('帐号不得小于{0}位！'),
				remote: '帐号已占用！',
			},
			login_pass:{
				required: '密码不得为空！',
				minlength: jQuery.validator.format('密码不得小于{0}位！'),
				remote: '帐号或密码不正确！',
			},
		},

	});
	$('#log_a').click(function(){
		$('#login').dialog('open');
	});

	$('#ques').dialog({
		autoOpen:false,
		width:500,
		height:360,
		modal:true,
		resizable:false,
		buttons:{
			'发布': function(){
				$(this).ajaxSubmit({
					url: 'add_content.php',
					type: 'POST',
					data:{
						user: $.cookie('user'),
					},
					beforeSubmit: function(){
						//alert($(".uEditorIframe").contents());
						$('#ques').dialog('widget').find('button').eq(1).button('disable');
						$('#loading').dialog('open');
					},
					success: function(responseText, statusText){
						$('#ques').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').html('数据提交成功...').css('background','url(img/success.gif) no-repeat 20px center');
						setTimeout(function(){
							$('#loading').dialog('close');
							$('#ques').dialog('close');
							$('#ques').resetForm();
							$('#loading').html('数据交互中...').css('background','url(img/loading.gif) no-repeat 20px center');
							login();
						}, 1000);
					},
					//resetForm: true,
				});
			}
		}
	});
	//pos = 200
	function replacePos(strObj, pos, replaceText){
		newStr = strObj.substr(0, pos-1) + replaceText + strObj.substring(pos, strObj.length);
		return newStr;
	};

	$.ajax({
		url: 'show_content.php',
		type: 'POST',
		dataType: 'json',
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
		success: function(response, status, xhr){
			var arr = [];
			var summary = [];

			for(var i = 0; i < response.length; i++){
				$('#content').html($('#content').html()+'<h4>' + response[i].user + '发表于' + response[i].date+ '</h4>'
					+ '<h3>' + response[i].title + '</h3>'
					+ '<div class="editor">' + response[i].content
					+ '</div><div class="bottom"><span class="comment">' + response[i].count + '条评论</span><span class="up">收起</span></div><hr noshade="noshade" size="1" />'
					+ '<div class="comment_list" data_id="' + response[i].id + '"></div>');
					//<dl class="comment_content"><dt>111</dt><dd>虽然她是花满楼的头牌，被众星捧月般地优待，可是她一直渴望着摆脱这样的生活，找一个爱她的男人，过简简单单的日子</dd><dd class="date">2017-10-24</dd></dl><dl class="comment_content"><dt>111</dt><dd>虽然她是花满楼的头牌，被众星捧月般地优待，可是她一直渴望着摆脱这样的生活，找一个爱她的男人，过简简单单的日子</dd><dd class="date">2017-10-24</dd></dl><dl class="comment_content"><dt>111</dt><dd>虽然她是花满楼的头牌，被众星捧月般地优待，可是她一直渴望着摆脱这样的生活，找一个爱她的男人，过简简单单的日子</dd><dd class="date">2017-10-24</dd></dl></div>');

			}
			//截取文本最前面200个字符来显示文本最前面的内容
			$.each($('#content .editor'), function(index, value){
				arr[index] = $(value).html();
				summary[index] = arr[index].substr(0, 200);
				//判断第200个字符是否为‘<’
				if(summary[index].substr(199) == '<'){
					summary[index] = replacePos(summary[index], 200, ' ');
				}
				//判断第199，200个字符是否为‘</’
				if(summary[index].substr(198) == '</'){
					summary[index] = replacePos(summary[index], 199, ' ');
					summary[index] = replacePos(summary[index], 200, ' ');
				}
				if(arr[index].length > 200){
					summary[index] = summary[index] + '<span class="down">...全部显示</span>'
					$(value).next('.bottom').find('.up').hide();
				}
				//alert(summary[index]);
				$(value).html(summary[index]);
			});

			//委托绑定 on('click', , )。由于需要绑定的‘.down’元素是通过ajax加载的，一开始不存在。因此动态绑定$(parent).on(event, element,function)才能使绑定不会在一次之后就失效
			$.each($('#content .editor'), function(index, value){
				$(this).on('click', '.down', function(){
					//alert($(value).parent().next().html());
					$('.bottom .up').eq(index).show();
					$(value).html(arr[index]);
				});
			});

			$.each($('#content .bottom .up'), function(index, value){
				$(this).click(function(){
					$(value).hide();
					$(value).parent().prev('.editor').html(summary[index]);
				});
			});

			$.each($('#content .bottom'),function(index, value){
				$(this).on('click', '.comment', function(){
					if($.cookie('user')){
						if(!$('#content .comment_list').eq(index).has('form').length){
							var page = 2;
							$.ajax({
								url: 'show_comment.php',
								type: 'POST',
								dataType: 'json',
								data:{
									'titleid': $('#content .comment_list').eq(index).attr('data_id'),
								},
								error: function(XMLHttpRequest, textStatus, errorThrown){
									alert(XMLHttpRequest.status);
									alert(XMLHttpRequest.readyState);
									alert(textStatus);
								},
								beforeSend: function(jqXHR, settings){
									$('#content .comment_list').eq(index).append('<dl class="comment_loading"><dd>正在加载评论</dd></dl>');
								},
								success: function(response, status, xhr){
									var count = response[1].count;
									$('#content .comment_list').eq(index).find('.comment_loading').hide();
									for(var i = 0; i < response.length; i++){
										$('#content .comment_list').eq(index).append('<dl class="comment_content"><dt>' + response[i].user + '</dt><dd>' + response[i].comment + '</dd><dd class="date">' + response[i].date + '</dd></dl>');
									}
									$('#content .comment_list').eq(index).append('<dl><dd><span class="load_more">加载更多评论</span></dd></dl>');
									$('#content .comment_list ').eq(index).find('.load_more').button().on('click', function(){
										$.ajax({
											url: 'show_comment.php',
											type: 'POST',
											dataType: 'json',
											data:{
												'titleid': $('#content .comment_list').eq(index).attr('data_id'),
												'page':page,
											},
											beforeSend: function(jqXHR, settings){
												$('#content .comment_list').eq(index).find('.load_more').button('disable').html('<img src="img/more_load.gif" />');
											},
											success: function(response, status, xhr){
												page++;
												if(page > count){
													$('#content .comment_list').eq(index).find('.load_more').off('click').parent().parent().hide();
												}
												for(var i = 0; i < response.length; i++){
													$('#content .comment_list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>' + response[i].user + '</dt><dd>' + response[i].comment + '</dd><dd class="date">' + response[i].date + '</dd></dl>');
												}
												$('#content .comment_list').eq(index).find('.load_more').button('enable').html('加载更多评论');
											},
										});
									});
								    $('#content .comment_list').eq(index).append('<form><dl class="comment_add"><dt class="text"><textarea name="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="'
										+ $('#content .comment_list').eq(index).attr('data_id') + '" /><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input class="button" type="button" value="发表" /></dd></dl></form>');
									$('#content .comment_list').eq(index).find('.button').button().click(function(){
										var _this = this;
										$('#content .comment_list form').eq(index).ajaxSubmit({
											url: 'add_comment',
											type:'POST',
											beforeSubmit: function(){
												//alert($(".uEditorIframe").contents());
												$(_this).button('disable');
												$('#loading').dialog('open');
											},
											success: function(responseText, statusText){
												var date = new Date();
												$(_this).button('enable');
												$('#loading').html('数据提交成功...').css('background','url(img/success.gif) no-repeat 20px center');
												setTimeout(function(){
													$('#loading').dialog('close');
													$('#content .comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('user') + '</dt><dd>' + $('#content .comment_list form').eq(index).find('textarea').val() + '</dd><dd class="date">' + date.getFullYear() + '-' +  (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
													$('#content .comment_list form').eq(index).resetForm();
													$('#loading').html('数据交互中...').css('background','url(img/loading.gif) no-repeat 20px center');
												}, 1000);
											},
										});
									});
								},
							});

						}

						if($('#content .comment_list').eq(index).is(':hidden')){
							$('#content .comment_list').eq(index).show();
						}else{
							$('#content .comment_list').eq(index).hide();
						}
					}else{
						$('#error').dialog('open');
						setTimeout(function(){
							$('#error').dialog('close');
							$('#login').dialog('open');
						},1000);
					}
				});
			});





			/*
			//限制内容的高度为155px来显示文本最前面的内容
			for(var i = 0; i < response.length; i++){
				$('#content').html($('#content').html()+'<h4>' + response[i].user + '发表于' + response[i].date+ '</h4>'
					+ '<h3>' + response[i].title + '</h3>'
					+ '<div class="editor">' + response[i].content
					+ '</div><div class="bottom">0条评论<span class="up">收起</span><span class="down">全部显示</span></div><hr noshade="noshade" size="1" />');
			}

			$.each($('#content .editor'), function(index, value){
				arr[index] = $(value).height();
				$(value).next().find('.up').hide();
				$(value).next().find('.down').hide();
				if($(value).height() > 155){
					$(value).next().find('.up').hide();
					$(value).next().find('.down').show()
					$(value).height(155);

				}
			});

			$.each($('#content .bottom .down'), function(index, value){
				$(this).click(function(){
					$(value).prev('.up').show();
					$(value).hide();
					$(value).parent().prev('.editor').height(arr[index]);
				});
			});

			$.each($('#content .bottom .up'), function(index, value){
				$(this).click(function(){
					$(value).next('.down').show();
					$(value).hide();
					$(value).parent().prev('.editor').height(155);
				});
			});

			*/


		},
	});




	$('#tabs').tabs({
		collapsible: true,
		active: true,
	});

	$('#accordion').accordion({
		collapsible: true,
		active: true,
	});

	$('#loading').dialog({
		autoOpen:false,
		modal:true,
		width:180,
		height:50,
		draggable:false,
		resizable:false,
	}).parent().find('.ui-widget-header').hide();

	$('#error').dialog({
		autoOpen:false,
		modal:true,
		width:180,
		height:50,
		draggable:false,
		resizable:false,
	}).parent().find('.ui-widget-header').hide();

})
