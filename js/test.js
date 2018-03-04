$(function(){
	/*
	$('#reg').ajaxForm({
		success: function(){
			alert('');
		}
	});*/
	$('#reg').submit(function(event){
		$(this).ajaxSubmit();
		event.preventDefault();
	});
});