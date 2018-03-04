<?php
	sleep(1);
	require 'config.php';
	$query = "INSERT INTO comment (titleid, comment,user, date)
	VALUES ('{$_POST['titleid']}', '{$_POST['comment']}', '{$_POST['user']}', NOW())"; 
	if(!mysqli_query($conn, $query)){
		die('新增失败!'.mysqli_error($conn));
	}
	echo mysql_affected_rows();
	mysql_close();
?>