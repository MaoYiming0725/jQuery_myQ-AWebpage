<?php
	sleep(1);
	require 'config.php';
	$query = "INSERT INTO question (title, content,user, date)
	VALUES ('{$_POST['ques_title']}', '{$_POST['contentuEditorTextarea']}', '{$_POST['user']}', NOW())"; 
	if(!mysqli_query($conn, $query)){
		die('新增失败!'.mysqli_error($conn));
	}
	echo mysql_affected_rows();
	mysql_close();
?>