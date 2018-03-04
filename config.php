<?php
	header('Content-Type:text/html; charset=utf-8');
	define('DB_HOST', 'localhost'); 
	define('DB_USER', 'root'); 
	define('DB_PWD', '1396716'); 
	define('DB_NAME', 'zhiwen');
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PWD);
	if(!$conn){
		die('数据库链接失败:'.mysqli_connect_error());	
	}
	if(!mysqli_select_db($conn, DB_NAME)){
		die('数据库错误:'.mysqli_error($conn)); 
	}
	mysqli_query($conn, 'SET NAMES UTF8');
?>