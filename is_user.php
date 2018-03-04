<?php
	require 'config.php';
	$query = mysqli_query($conn, "SELECT user FROM user WHERE user='{$_POST['user']}'");
	if(!$query){
		die('SQL失败!'.mysqli_error($conn));
	}
	if (mysqli_fetch_array($query, MYSQL_ASSOC)) { 
		echo 'false';
	} else {
		echo 'true';
	}

	mysql_close(); 
?>