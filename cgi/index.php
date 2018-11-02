<?php


	$do = $_GET['do'];
	if(!empty($do)){
		switch($do){
			case 'place':
			place();
			break;
			case 'myorders':
			yourorders();
			break;
			default:
			echo 0;
		}
	}
	function place(){
			$username = 'root';
	$password = 'usbw';
	$host = 'localhost';
	$dbname = 'id3506608_cgi';
		$conn = new mysqli($host, $username, $password, $dbname);
	if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
	}
		$data = $_GET['data'];
		$obj = json_decode($data);
		$c = ",";$q = "'";
		$obj->status = 'placed';
		$replace = $obj->userid.$c.
				   $q.$obj->name.$q.$c.
				   $q.$obj->odr.$q.$c.
				   $obj->time.$c.
				   $q.$obj->status.$q;

		$sql = "INSERT INTO `orders`(`userid`, `name`, `odr`, `time`, `status`) VALUES (".$replace.")";
		if ($conn->query($sql) === TRUE) {
		    echo 1;
		} else {
		    echo $conn->error;
		}
		$conn->close();
	}
	function yourorders(){
			$username = 'root';
	$password = 'usbw';
	$host = 'localhost';
	$dbname = 'id3506608_cgi';
		$conn = new mysqli($host, $username, $password, $dbname);
	if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
	}
		$data = $_GET['data'];
		if(!is_numeric($data)) {
			echo 'Nice Try but Im secured man!!';
			return;
		};
		$query = "SELECT * FROM `orders` WHERE `userid` = ".$data;
		$arr = array();
		if ($result = $conn->query($query)) {

		    while ($row = $result->fetch_assoc()) {
			    array_push($arr,json_encode($row));
		    }
		    echo json_encode($arr);
			
		    /* free result set */
		    $result->free();
		}
		$conn->close();
	}
?>