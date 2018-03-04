<?php
	require 'config.php';
	$_pass = sha1($_POST['login_pass']);
	$query = mysqli_query($conn, "SELECT user,pass FROM user WHERE user='{$_POST['login_user']}' AND pass='{$_pass}'");
	if(!$query){
		die('SQL失败!'.mysqli_error($conn));
	}
	if (mysqli_fetch_array($query, MYSQL_ASSOC)) { 
		echo 'true';
	} else {
		echo 'false';
	}
	mysql_close();
		
?>