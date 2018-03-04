<?php
	sleep(3);
	require 'config.php';
	$query = "INSERT INTO user (user, pass, email, sex, birth) VALUES ('{$_POST['user']}', sha1('{$_POST['pass']}'), '{$_POST['email']}','{$_POST['sex']}', '{$_POST['birth']}')";

	if(!mysqli_query($conn, $query)){
		die('新增失败!'.mysqli_error($conn));
	}
	echo mysql_affected_rows();
	mysql_close(); 
?>