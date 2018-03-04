<?php
	require 'config.php';
	$query = "SELECT (SELECT COUNT(*) FROM comment WHERE titleid=a.id) AS count,a.id,a.title,a.content,a.user,a.date FROM question a ORDER BY a.date DESC LIMIT 0,10";
	$result = mysqli_query($conn, $query);
	if(!$result){
		die('错误!'.mysqli_error($conn));
	}
	//$json = '';
	while (!!$row = mysqli_fetch_array($result, MYSQL_ASSOC)) { 
		foreach ( $row as $key => $value ) {
			$row[$key] = urlencode(str_replace("\n","", $value)); 
		}
		$json .= urldecode(json_encode($row)).','; 
		//print_r($row);
	}
	echo '['.substr($json, 0, strlen($json) - 1).']';
	mysql_close(); 
?>