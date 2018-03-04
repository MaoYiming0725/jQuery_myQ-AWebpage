<?php
	sleep(1);
	require 'config.php';

	$_sql = mysqli_query($conn, "SELECT COUNT(*) AS count FROM comment WHERE titleid='{$_POST['titleid']}'");
	$_result = mysqli_fetch_array($_sql, MYSQL_ASSOC);
	$_page = 1;
	$_pagesize = 2;
	$_count = ceil($_result['count'] / $_pagesize);


	if (!isset($_POST['page'])) { 
		$_page = 1;
	} else {
		$_page = $_POST['page']; 
		if ($_page > $_count) {
			$_page = $_count; 
		}
	}
	$_limit = ($_page - 1) * $_pagesize;


	$query = "SELECT ({$_count}) AS count,titleid,comment,user,date FROM comment WHERE titleid='{$_POST['titleid']}' ORDER BY date DESC LIMIT {$_limit},{$_pagesize}";
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