<?php


	$do = $_GET['do'];
	if(!empty($do)){
		switch($do){
			case 'place':
			place();
			break;
			case 'status':
			status();
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
?>