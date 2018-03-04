

ob(function(){
	
	ob('.center').hover(function(){
		ob(this).css('background', 'url(images/arrow2.png)no-repeat 55px center');
		//ob().getClass('center').css('background', 'url(images/arrow2.png)no-repeat 55px center');
		ob('.center_ul').show().animate({
			mul: {
				'o': 100,
				'h': 120
			}
		});
	}, function(){
		ob(this).css('background', 'url(images/arrow.png)no-repeat 55px center');
		ob('.center_ul').animate({
			mul: {
				'o': 0,
				'h': 0
			},
			fn: function(){
				ob('.center_ul').hide();
				//screen.unlock();
			}
		});
	});
	
	//登录
	var login = ob("#login");
	var screen = ob("#screen");

	login.center(250, 350).resize(function(){
		if(login.css('display') == "block")
		{
			screen.lock();
		}
	});
	ob("#header .login").click(function(){
		//alert(screen.css('opacity'));
		login.center(250, 350);
		login.show();
		screen.lock();
		screen.animate({
			attr: 'o',
			target:30
		});
	});
	ob("#login .close").click(function(){
		login.hide();
		screen.animate({
			attr: 'o',
			target:0,
			fn: function(){
				screen.unlock();
			}
		});
	});

	ob("#form_login").form('sub').click(function(){
		var _this = this;

		if((/[\w]{2,20}/.test(ob("#form_login").form('user').value())) && ob("#form_login").form('pass').value().length >= 6){
			_this.disabled = true;
			ob(_this).css('backgroundPosition', 'right');
			ob('#loading').css('display', 'block').center(40, 200);
			ob('#loading p').html('正在尝试登录...');
			ajax({
				url: 'is_login.php',
				method: 'post',
				async: true,
				data: ob('#form_login').serialize(),
				success: function(text){
					ob('#loading').css('display', 'none');
					if(text == 1){//成功
						ob('#login .info').html('');
						ob('#success').css('display', 'block').center(40, 200);
						ob('#success p').html('登录成功...');
						_this.disabled = false;
						ob(_this).css('backgroundPosition', 'left');
						setCookie('user', ob("#form_login").form('user').value());
						setTimeout(function(){
							
							screen.animate({
								attr: 'o',
								target:0,
								fn: function(){
									screen.unlock();
								}
							});
							ob('#success').css('display', 'none');
							login.css('display', 'none');
							ob('#header .info').css('display', 'block').html(getCookie('user') + '，您好！');
							ob('#header .reg').css('display', 'none');
							ob('#header .login').css('display', 'none');
							ob('#form_login').first().reset();
						}, 1500);
					}else{
						ob('#login .info').html('登录失败: 用户名或密码不正确！');
					}
				}
			});
		}else{
			ob('#login .info').html('登录失败: 用户名或密码不合法！');
		}
	});

	//忙鲁篓氓鈥犈
	var reg = ob("#reg");

	reg.center(600, 550).resize(function(){
		if(reg.css('display') == "block")
		{
			screen.lock();
		}
	});
	
	ob("#header .reg").click(function(){
		//alert(screen.css('opacity'));
		reg.center(600, 550);
		reg.show();
		screen.lock();
		screen.animate({
			attr: 'o',
			target:30
		});
	});
	ob("#reg .close").click(function(){
		reg.hide();
		screen.animate({
			attr: 'o',
			target:0,
			fn: function(){
				screen.unlock();
			}
		});
	});
	//
	ob('#form_reg').form('user').bind('focus', function(){
		ob('#reg dl dd  .info_user').show();
		ob('#reg dl dd .error_user').hide();
		ob('#reg dl dd .succ_user').hide();

	}).bind('blur', function(){
		//alert(ob(this).value());
		if(trim(ob(this).value()).length == 0){//莽漏
			ob('#reg dl dd  .info_user').hide();
		}else if(! check_user()){//茅鈥濃劉猫炉炉
			ob('#reg dl dd .error_user').show();
		}else{
			ob('#reg dl dd .succ_user').show();
		}
	});

	function check_user(){
		var flag = true;
		ob('#reg dl dd .info_user').hide();
		if(! /[\w]{2,20}/.test(ob('#form_reg').form('user').value())){
			ob('#reg dl dd .error_user').html('输入不合法，请重新输入！');
			return false;
		}
		else{
			ob('#reg dl dd .loading').css('display', 'block');
			ajax({
				url: 'is_user.php',
				method: 'post',
				async: false,
				data: {
					user: ob('#form_reg').form('user').value()
				},
				success: function(text){
					if(text == '1'){
						ob('#reg dl dd .error_user').html('用户名已占用！');
						flag = false;
					}else{
						flag =  true;
					}
					ob('#reg dl dd .loading').css('display', 'none');	
	
				}
			});
			return flag;
		}


	}

	//
	ob('#form_reg').form('pass').bind('focus', function(){
		ob('#reg dl dd  .info_pass').show();
		ob('#reg dl dd .error_pass').hide();
		ob('#reg dl dd .succ_pass').hide();
		check_pass();
	}).bind('blur', function(){
		//alert(ob(this).value());
		if(trim(ob(this).value()).length == 0){//莽漏
			ob('#reg dl dd  .info_pass').hide();
		}
		else{
			if(check_pass()){//茅鈥濃劉猫炉炉
				ob('#reg dl dd .info_pass').hide();
				ob('#reg dl dd .succ_pass').show();
			}else{//忙藛聬氓艩鸥
				ob('#reg dl dd .info_pass').hide();
				ob('#reg dl dd .error_pass').show();
			}
		}
	});


	ob('#form_reg').form('pass').bind('keyup', function(){
		check_pass();

	})


	function check_pass(){
		var value = trim(ob('#form_reg').form('pass').value());
		var length = value.length;
		var num = 0;
		//
		if(length >= 6 && length <= 20){
			ob('#reg .info_pass .p1').html('●').css('color', 'green');
		}else{
			ob('#reg .info_pass .p1').html('●').css('color', '#666');
		}
		//
		if(length > 0 && ! /\s/.test(value)){
			ob('#reg .info_pass .p2').html('●').css('color', 'green');
		}else{
			ob('#reg .info_pass .p2').html('●').css('color', '#666');
		}
		//
		if(/[0-9]/.test(value)){
			num++;
		}
		if(/[a-z]/.test(value)){
			num++;
		}
		if(/[A-Z]/.test(value)){
			num++;
		}
		if(/[^0-9a-zA-Z]/.test(value)){
			num++;
		}
		if(num >= 2){
			ob('#reg .info_pass .p3').html('●').css('color', 'green');
		}else{
			ob('#reg .info_pass .p3').html('●').css('color', '#666');			
		}

		//security level
		if(length >= 10 && num >=3){
			ob('#reg .info_pass .s1').css('color', 'green');
			ob('#reg .info_pass .s2').css('color', 'green');
			ob('#reg .info_pass .s3').css('color', 'green');
			ob('#reg .info_pass .s4').html('高').css('color', 'green');

		}else if(length >= 8 && num >=2){
			ob('#reg .info_pass .s1').css('color', '#f60');
			ob('#reg .info_pass .s2').css('color', '#f60');
			ob('#reg .info_pass .s3').css('color', '#ccc');
			ob('#reg .info_pass .s4').html('中').css('color', '#f60');
		}else if(length >= 1){
			ob('#reg .info_pass .s1').css('color', 'maroon');
			ob('#reg .info_pass .s2').css('color', '#ccc');
			ob('#reg .info_pass .s3').css('color', '#ccc');
			ob('#reg .info_pass .s4').html('低').css('color', 'maroon');
		}else{
			ob('#reg .info_pass .s1').css('color', '#ccc');
			ob('#reg .info_pass .s2').css('color', '#ccc');
			ob('#reg .info_pass .s3').css('color', '#ccc');
			ob('#reg .info_pass .s4').html('').css('color', '#666');

		}

		if((length >= 6 && length <= 20) && (! /\s/.test(value)) && (num >= 2))return true;
		else return false;
	}

	//pass2
	ob('#form_reg').form('pass2').bind('focus', function(){
		ob('#reg dl dd .info_pass2').show();
		ob('#reg dl dd .error_pass2').hide();
		ob('#reg dl dd .succ_pass2').hide();

	}).bind('blur', function(){
		if(trim(ob(this).value()).length == 0){//
			ob('#reg dl dd .info_pass2').hide();
		}else if(check_pass2()){
			ob('#reg dl dd .info_pass2').hide();	
			ob('#reg dl dd .succ_pass2').show();		
		}else{
			ob('#reg dl dd .info_pass2').hide();	
			ob('#reg dl dd .error_pass2').show();			
		}
	});

	function check_pass2(){
		if(trim(ob('#form_reg').form('pass2').value()) == trim(ob('#form_reg').form('pass').value()))return true;
		else return false;
	}

	//ques

	ob('#form_reg').form('ques').bind('change', function(){
		if(check_ques())ob('#reg dl dd .error_ques').hide();
	});

	function check_ques(){
		if(ob('#form_reg').form('ques').value() != 0)return true;
		else return false;
	}

	//ans
	ob('#form_reg').form('ans').bind('focus', function(){
		ob('#reg dl dd .info_ans').show();
		ob('#reg dl dd .error_ans').hide();
		ob('#reg dl dd .succ_ans').hide();

	}).bind('blur', function(){
		if(trim(ob(this).value()).length == 0){//
			ob('#reg dl dd .info_ans').hide();
		}else if(check_ans()){
			ob('#reg dl dd .info_ans').hide();	
			ob('#reg dl dd .succ_ans').show();		
		}else{
			ob('#reg dl dd .info_ans').hide();	
			ob('#reg dl dd .error_ans').show();			
		}
	});

	function check_ans(){
		if(trim(ob('#form_reg').form('ans').value()).length >=2 && trim(ob('#form_reg').form('ans').value()).length <= 32)return true;
		else return false;
	}

	//email
	ob('#form_reg').form('email').bind('focus', function(){
		ob('#reg dl dd .info_email').show();
		ob('#reg dl dd .error_email').hide();
		ob('#reg dl dd .succ_email').hide();
		if(! /@/.test(ob(this).value())){
			ob('#reg dl dd .all_email').show();
			ob('#reg dl dd .all_email li span').html(ob(this).value());
		}
	}).bind('blur', function(){
		if(trim(ob(this).value()).length == 0){//
			ob('#reg dl dd .info_email').hide();
		}else if(check_email()){
			ob('#reg dl dd .info_email').hide();	
			ob('#reg dl dd .succ_email').show();		
		}else{
			ob('#reg dl dd .info_email').hide();	
			ob('#reg dl dd .error_email').show();			
		}
		ob('#reg dl dd .all_email').hide();
	});

	function check_email(){
		if(/^[\w-\.]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim(ob('#form_reg').form('email').value())))return true;
		else return false;
	}

	//all_email mouse
	ob('#reg dl dd .all_email li').hover(function(){
		ob(this).css('background', '#E5EDF2').css('color', '#369');
	}, function(){
		ob(this).css('background', '#fff').css('color', '#666');
	}).bind('mousedown', function(){
		ob('#form_reg').form('email').value(ob(this).text());
	});

	//all_email key
	ob('#form_reg').form('email').bind('keyup', function(event){
		if(! /@/.test(ob(this).value())){
			ob('#reg dl dd .all_email').show();
			ob('#reg dl dd .all_email li span').html(ob(this).value());
		}else{
			ob('#reg dl dd .all_email').hide();
		}

		ob('#reg dl dd .all_email li').css('background', '#fff').css('color', '#666');
		length = ob('#reg dl dd .all_email li').length();
		if(event.keyCode == 40){
			if(this.index == undefined || this.index == length - 1)this.index = 0;
			else this.index++;
			ob('#reg dl dd .all_email li').getEle(this.index).css('background', '#E5EDF2').css('color', '#369');
		}

		if(event.keyCode ==38){
			if(this.index == undefined || this.index == 0)this.index = length - 1;
			else this.index--;
			ob('#reg dl dd .all_email li').getEle(this.index).css('background', '#E5EDF2').css('color', '#369');
		}

		if(event.keyCode == 13){
			ob(this).value(ob('#reg dl dd .all_email li').getEle(this.index).text());
			ob('#reg dl dd .all_email').hide();
			this.index = undefined;
		}

	});

	//birthday
	var year = ob('#form_reg').form('year');
	var month = ob('#form_reg').form('month');
	var day = ob('#form_reg').form('day');

	for(var i = 1935; i <= 2013; i++){
		year.first().add(new Option(i, i), undefined)//undefined拢卢IE脫毛脝盲脣没盲炉脌脌脝梅碌脛录忙脠脻拢禄 null拢卢IE脰脨脦脼路篓脧脭脢戮
	}

	for(var i = 1; i <= 12; i++){
		month.first().add(new Option(i, i), undefined)//undefined拢卢IE脫毛脝盲脣没盲炉脌脌脝梅碌脛录忙脠脻拢禄 null拢卢IE脰脨脦脼路篓脧脭脢戮
	}

	year.bind('change', select_day);
	month.bind('change', select_day);
	day.bind('change', function(){
		if(check_birth())ob('#reg dl dd .error_birth').hide();
	});
	function select_day(){
		var day30 = [4, 6, 9, 11];
		var day31 = [1, 3, 5, 7, 8, 10, 12];
		var num = 0;
		day.first().options.length = 1;
		if(year.value() != 0 && month.value() != 0){
			if(inArray(day30, parseInt(month.value()))){
				num = 30;
			}else if(inArray(day31, parseInt(month.value()))){
				num = 31;
			}else{
				if((parseInt(year.value()) % 4  == 0 && parseInt(year.value()) % 100  != 0) 
													 || parseInt(year.value()) % 400  == 0){
					num = 29;
				}else{
					num = 28;
				}
			}
			for(var i = 1; i <= num; i++){
				day.first().add(new Option(i, i), undefined)//undefined拢卢IE脫毛脝盲脣没盲炉脌脌脝梅碌脛录忙脠脻拢禄 null拢卢IE脰脨脦脼路篓脧脭脢戮
			}	
		}else{
			day.first().options.length = 1;
		}
	}

	function check_birth(){
		if(year.value() != 0 && month.value() != 0 && day.value() != 0)return true;
		else return false;
	}

	//ps
	ob('#form_reg').first().reset();

	ob('#form_reg').form('ps').bind('keyup',check_ps).bind('paste', function(){
		setTimeout(check_ps,1);
	});

	ob('#reg .ps .clear').click(function(){
		ob('#form_reg').form('ps').value((ob('#form_reg').form('ps').value().substring(0,200)));
		check_ps();
	});

	function check_ps(){
		var num = 200 - ob('#form_reg').form('ps').value().length;
		if(num >= 0){
			ob('#reg dl .ps').getEle(0).css('display', 'block');
			ob('#reg dl .ps').getEle(1).css('display', 'none');
			ob('#reg dl dd .num').getEle(0).html(num);
			return true;
		}else{
			ob('#reg dl .ps').getEle(0).css('display', 'none');
			ob('#reg dl .ps').getEle(1).css('display', 'block');
			ob('#reg dl dd .num').getEle(1).html(-num).css('color', 'red');
			return false;
		}
	}
   
	//submit
	ob('#form_reg').form('sub').click(function(){
		var _this = this;
		var flag = true;
		if(! check_user()){
			flag = false;
			ob('#reg dl dd .error_user').show();
		}
		if(! check_pass()){
			flag = false;
			ob('#reg dl dd .error_pass').show();
		}
		if(! check_pass2()){
			flag = false;
			ob('#reg dl dd .error_pass2').show();
		}
		if(! check_ques()){
			flag = false;
			ob('#reg dl dd .error_ques').show();
		}
		if(! check_ans()){
			flag = false;
			ob('#reg dl dd .error_ans').show();
		}
		if(! check_email()){
			flag = false;
			ob('#reg dl dd .error_email').show();
		}
		if(! check_birth()){
			flag = false;
			ob('#reg dl dd .error_birth').show();
		}
		if(! check_ps()){
			flag = false;
		}
		if(flag){
			_this.disabled = true;
			ob(_this).css('backgroundPosition', 'right');
			ob('#loading').css('display', 'block').center(40, 200);
			ob('#loading p').html('正在提交注册中...');
			ajax({
				url: 'add.php',
				method: 'post',
				async: true,
				data: ob('#form_reg').serialize(),
				success: function(text){
					if(text == 1){
						ob('#loading').css('display', 'none')
						ob('#success').css('display', 'block').center(40, 200);
						ob('#success p').html('注册完成请登录...');
						_this.disabled = false;
						ob(_this).css('backgroundPosition', 'left');
						setTimeout(function(){
							
							screen.animate({
								attr: 'o',
								target:0,
								fn: function(){
									screen.unlock();
								}
							});
							ob('#success').css('display', 'none');
							reg.css('display', 'none');
							ob('#reg .succ').css('display', 'none');
							ob('#form_reg').first().reset();

						}, 1500);
					}
				}
			});
		}
		
	});


	 //blog
	 
	var blog = ob('#blog');

	blog.center(320, 580).resize(function(){
		if(blog.css('display') == "block")
		{
			screen.lock();
		}
	});
	ob("#header .center_ul li").getEle(0).click(function(){
		blog.center(320, 580).show();
		screen.lock().animate({
			attr: 'o',
			target:30
		});
	});
	ob("#blog .close").click(function(){
		blog.hide();
		screen.animate({
			attr: 'o',
			target:0,
			fn: function(){
				screen.unlock();
			}
		});
	});

	ob("#form_blog").form('sub').click(function(){
		var _this = this;
		if(trim(ob('#form_blog').form('title').value()).length > 0 && trim(ob('#form_blog').form('content').value()).length > 0 ){
			_this.disabled = true;
			ob(_this).css('backgroundPosition', 'right');
			ob('#loading').css('display', 'block').center(40, 200);
			ob('#loading p').html('正在发表博文...');
			ajax({
				url: 'add_blog.php',
				method: 'post',
				async: true,
				data: ob('#form_blog').serialize(),
				success: function(text){

					ob('#loading').css('display', 'none');
					if(text == 1){//成功
						ob('#blog .info').html('');
						ob('#success').css('display', 'block').center(40, 200);
						ob('#success p').html('发表成功...');
						_this.disabled = false;
						ob(_this).css('backgroundPosition', 'left');
						setTimeout(function(){
							screen.animate({
								attr: 'o',
								target:0,
								fn: function(){
									screen.unlock();
									
									ob('#main .blog').html('<span class="loading"></span>');
									ob('#main .blog .loading').show();
									ajax({
										url: 'get_blog.php',
										method: 'post',
										data: {},
										async: true,
										success: function(text){
											ob('#main .blog .loading').hide();
											var json = JSON.parse(text);
											var html = '';
											for(var i = 0; i < json.length; i++){
												html += '<div class="content"><h2>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
											}
											ob('#main .blog').html(html);
											for(var j = 0; j < json.length; j++){
												ob('#main .blog .content').getEle(j).animate({
													attr: 'o',
													start: 0,
													target: 100,
													t: 30,
													step: 10
												});
											}
											
											
										}
									});
								}
							});
							ob('#success').css('display', 'none');
							blog.css('display', 'none');
							ob('#form_blog').first().reset();
						}, 1500);
					}
				}
			});
			
		}else{
			ob('#blog .info').html('发表失败：标题或内容不得为空');
		}
		
	});

	ob('#main .blog .content').opacity(0);
	ob('#main .blog .loading').show();
	ajax({
		url: 'get_blog.php',
		method: 'post',
		data: {},
		async: true,
		success: function(text){
			ob('#main .blog .loading').hide();
			var json = JSON.parse(text);
			var html = '';
			for(var i = 0; i < json.length; i++){
				html += '<div class="content"><h2>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
			}
			ob('#main .blog').html(html);
			for(var j = 0; j < json.length; j++){
				ob('#main .blog .content').getEle(j).animate({
					attr: 'o',
					start: 0,
					target: 100,
					t: 30,
					step: 10
				});
			}
			
			
		}
	});

	//background
	var bg = ob('#bg');

	bg.center(360, 650).resize(function(){
		if(bg.css('display') == "block")
		{
			screen.lock();
		}
	});
	ob("#header .center_ul li").getEle(1).click(function(){
		bg.center(360, 650).show();
		screen.lock().animate({
			attr: 'o',
			target:30
		});
		ajax({
			url: 'get_bg.php',
			method: 'post',
			data: {
				'type': 'all'
			},
			async: true,
			success: function(text){
				var json = JSON.parse(text);
				var html = '';
				for(var i = 0; i < json.length; i++){
					html += '<dl><dt><img src="images/' + json[i].small_bg + '" big_bg="' + json[i].big_bg + '" bg_color="' + json[i].bg_color + '" /></dt><dd>' + json[i].bg_text + '</dd></dl>';
				}
				ob('#bg .bg_skin').html(html);
				ob('#bg .bg_skin dl dt img').click(function(){
					ob('body').css('background', ob(this).attr('bg_color') + ' ' + 'url(images/' + ob(this).attr('big_bg') + ')' + ' ' + 'no-repeat');
					ajax({
						url: 'get_bg.php',
						method: 'post',
						data: {
							'type': 'set',
							'big_bg':ob(this).attr('big_bg')
						},
						async: true,
						success: function(text){
							if(text == 1){
								ob('#success').css('display', 'block').center(40, 200);
								ob('#success p').html('换肤成功...');
								setTimeout(function(){
									screen.animate({
										attr: 'o',
										target:0,
										fn: function(){
											screen.unlock();
										}
									});
									ob('#success').css('display', 'none');
									bg.css('display', 'none');
								}, 1500);

							}
						}
					});
				});
			}
		});
	});
	ob("#bg .close").click(function(){
		bg.hide();
		screen.animate({
			attr: 'o',
			target:0,
			fn: function(){
				screen.unlock();
			}
		});
	});

	ajax({
		url: 'get_bg.php',
		method: 'post',
		data: {
			'type': 'default'
		},
		async: true,
		success: function(text){
			var json = JSON.parse(text);
			ob('body').css('background', json.bg_color + ' ' + 'url(images/' + json.big_bg + ')' + ' ' + 'no-repeat');
		}
	});


	//拖拽
	login.drag(ob('#login h2').last());
	reg.drag(ob('#reg h2').last());
	blog.drag(ob('#blog h2').last());
	bg.drag(ob('#bg h2').last());


	//脗陆脗芦脗路脙鈥撁兟徝兟偮疵偮懊偮棵兣∶冣撁兤捗冣溍兣∶偮疵偮懊偮棵兣∶冣斆兟冣斆兟趁偮裁兟
	var share = ob("#share");
	share.css('left', '-211px').css('top', (parseInt(getInner().height) - parseInt(share.css('height')))/2 + 'px');
	
	addEvent(window, 'scroll', function(){
		setTimeout(function(){
			share.animate({
				attr: 'y',
				target: getScroll().top + (parseInt(getInner().height) - parseInt(share.css('height')))/2
			});
		}, 100);
		
		//share.css('top', getScroll().top + (parseInt(getInner().height) - parseInt(share.css('height')))/2 + 'px');
	});
	//脗路脙鈥撁兟徝兟偮疵偮懊偮棵兣∶偮得冣灻冣櫭冣犆兯喢兟冣櫭冣犆偮趁兟
	
	
	//猫聫艙氓聧鈥⒚β
	ob("#nav .about li").hover(function(){
		var target = ob(this).first().offsetLeft; 
		//alert(ob('#nav .nav_bg').innerHTML);
		//alert('start');
		ob('#nav .nav_bg').animate({
			attr : 'x',
			target : target + 20,
			fn: function(){
				//alert('start1');
				ob("#nav .white").animate({ 
 					attr: 'x',
 					t:10,
 					target: -target
				});
			}
		});
	}, function(){
		ob('#nav .nav_bg').animate({
			attr : 'x',
			target : 20,
			fn: function(){
				ob("#nav .white").animate({ 
 					attr: 'x',
 					t:10,
 					target: 0
				});

			}		
		});
	});

	ob("#main .sidebar h2").toggle(function(){
		ob(this).next().animate({
			mul: {
				'o': 0,
				'h': 0 
			}
		});
	}, function(){
		ob(this).next().animate({
			mul: {
				'o':100,
				'h':150
			}
		});
	});

	//banner initialization
	//ob('#main .banner img').getEle(0).css('z-index', '2');
	ob('#main .banner img').opacity(0);
	ob('#main .banner img').getEle(0).opacity(100);
	ob('#main .banner ul li').getEle(0).css('color', '#333');
	ob('#main .banner strong').html(ob('#main .banner img').getEle(0).attr('alt'));

	var banner_ind = 1;
	var num = ob('#main .banner ul li').length();
	var banner_timer = setInterval(banner_fn, 1000);

	var banner_type = 2;

	ob('#main .banner ul li').hover(function(){
		clearInterval(banner_timer);
		if(ob(this).css('color') != 'rgb(51, 51, 51)' && ob(this).css('color') != '#333')
				banner(this, banner_ind == 0 ? (num-1) : (banner_ind -1) % num); 
	}, function(){
		banner_ind = ob(this).ind() + 1;
		banner_timer = setInterval(banner_fn, 1000);
	});

	function banner(obj, prev){
		//ob('#main .banner img').css('z-index', '1');
		//ob('#main .banner img').getEle(ob(obj).ind()).css('z-index', '2');
		if(banner_type == 1){
			ob('#main .banner img').css('z-index', 1);
			ob('#main .banner img').getEle(prev).animate({
				attr : 'o',
				target: 0,
				t: 30,
				step: 10
			}).css('z-index', 1);
			ob('#main .banner img').getEle(ob(obj).ind()).animate({
				attr : 'o',
				target: 100,
				t: 30,
				step: 10
			}).css('z-index', 2);
		}else if(banner_type == 2){
			ob('#main .banner img').css('z-index', 1).opacity(100);
			ob('#main .banner img').getEle(prev).animate({
				attr : 'y',
				start: 0,
				target: 150,
				t: 30,
				step: 10
			}).css('z-index', 1);
			ob('#main .banner img').getEle(ob(obj).ind()).animate({
				attr : 'y',
				start: -150,
				target: 0,
				t: 30,
				step: 10
			}).css('z-index', 2);
		}
		ob('#main .banner ul li').css('color', '#999');
		ob(obj).css('color', '#333');
		ob('#main .banner strong').html(ob('#main .banner img').getEle(ob(obj).ind()).attr('alt'));
	}

	function banner_fn(){
		banner(ob('#main .banner ul li').getEle(banner_ind % num).first(), banner_ind == 0 ? (num-1) : (banner_ind -1) % num);
		banner_ind++;
	}


	//wait_load
	//ob('#main .photos dl dt img').getEle(0).attr('src', ob('#main .photos dl dt img').getEle(0).attr('xsrc'));
	//alert(ob('#main .photos dl dt img').getEle(0).first().offsetTop);
	//alert(getInner().height + getScroll().top);
	var wait_load = ob('#main .photos .wait_load')
	wait_load.opacity(0);
	ob(window).bind('scroll', function(){
		setTimeout(function(){
			for(var i = 0; i < wait_load.length(); i++){
				var _this = wait_load.getElement(i);
				if((getInner().height + getScroll().top) >= offsetTop(_this)){
					ob(_this).attr('src', ob(_this).attr('xsrc')).animate({
						attr: 'o',
						target: 100,
						t: 30,
						step: 10
					})
				}
			}
			
		}, 100);
		

	});


	//preload
	var preload = ob("#photos_big");

	preload.center(620, 511).resize(function(){
		if(preload.css('display') == "block")
		{
			screen.lock();
		}
	});

	var big = ob("#photos_big .big img");
	ob("#main .photos dl dt img").click(function(){
		preload.center(620, 511);
		preload.show();
		screen.lock();
		screen.animate({
			attr: 'o',
			target:30
		});

		var tmp_image = new Image();
		ob(tmp_image).bind('load', function(){
			big.attr('src', tmp_image.src).css('width', '600px').css('height', '450px').css('margin', '0 auto');
			big.animate({
				attr: 'o',
				start: 0,
				target: 100,
				t: 30,
				step: 10
			});
		})
		tmp_image.src = ob(this).attr('bigsrc');

		prev_next_img(this.parentNode.parentNode)
	});

	ob("#photos_big .big .left").click(function(){

		big.attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('margin', '190px auto 0 auto');
		var tmp_image = new Image();
		ob(tmp_image).bind('load', function(){
			big.attr('src', tmp_image.src).css('width', '600px').css('height', '450px').css('margin', '0 auto');
			big.animate({
				attr: 'o',
				start: 0,
				target: 100,
				t: 30,
				step: 10
			});
		})
		tmp_image.src = ob(this).attr('src'); 

		prev_next_img(ob("#main .photos dl").getElement(prevIndex(ob("#photos_big .big img").attr('index'), ob("#main .photos").first())));

	});

	ob("#photos_big .big .right").click(function(){
		//nextIndex(ob("#photos_big .big img").attr('index'), ob("#main .photos").first());
		big.attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('margin', '190px auto 0 auto');
		var tmp_image = new Image();
		ob(tmp_image).bind('load', function(){
			big.attr('src', tmp_image.src).css('width', '600px').css('height', '450px').css('margin', '0 auto');
			big.animate({
				attr: 'o',
				start: 0,
				target: 100,
				t: 30,
				step: 10
			});
		})
		tmp_image.src = ob(this).attr('src'); 
		prev_next_img(ob("#main .photos dl").getElement(nextIndex(ob("#photos_big .big img").attr('index'), ob("#main .photos").first())));

	});


	function prev_next_img(current_node){
		var prev_image = new Image();
		var next_image = new Image();

		//var current_node = ob("#main .photos dl").getElement(prevIndex(ob("#photos_big .big img").attr('index'), ob("#main .photos").first()));
		//alert(prevIndex(ob("#photos_big .big img").attr('index'), ob("#main .photos").first()));
		var prev_ind = prevIndex(ob(current_node).ind(), current_node.parentNode);
		var next_ind = nextIndex(ob(current_node).ind(), current_node.parentNode);
	
		prev_image.src = ob('#main .photos dl dt img').getEle(prev_ind).attr('bigsrc');
		next_image.src = ob('#main .photos dl dt img').getEle(next_ind).attr('bigsrc');
		ob("#photos_big .big .left").attr('src', prev_image.src);
		ob("#photos_big .big .right").attr('src', next_image.src);
		ob("#photos_big .big img").attr('index', ob(current_node).ind());
		ob("#photos_big .big em").html((parseInt(ob(current_node).ind()) + 1 )+ "/" + ob('#main .photos dl dt img').length());

	}

	ob("#photos_big .big .left").hover(function(){
		ob("#photos_big .big .sl").animate({
			attr: 'o',
			target: 50,
			t:30,
			step: 10
		});
	}, function(){
		ob("#photos_big .big .sl").animate({
			attr: 'o',
			target: 0,
			t:30,
			step: 10
		});
	});
	ob("#photos_big .big .right").hover(function(){
		ob("#photos_big .big .sr").animate({
			attr: 'o',
			target: 50,
			t:30,
			step: 10
		});
	}, function(){
		ob("#photos_big .big .sr").animate({
			attr: 'o',
			target: 0,
			t:30,
			step: 10
		});
	});
	ob("#photos_big .close").click(function(){
		preload.hide();
		screen.animate({
			attr: 'o',
			target:0,
			fn: function(){
				screen.unlock();
			}
		});
		big.attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('margin', '190px auto 0 auto');
	});

	preload.drag(ob('#photos_big h2').last());

	
	//share

	ob("#share").hover(function(){
		ob(this).animate({
			attr:'x',
			target:0
		});
	}, function(){
		ob(this).animate({
			attr:'x',
			target:-211
		});
		//document.getElementById('record').innerHTML +=  'out' + '<br />';
	});
	
});

