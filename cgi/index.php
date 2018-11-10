<?php
	$GLOBALS['username'] = 'id3506608';
	$GLOBALS['password'] = 'cgipassword';
	$GLOBALS['host'] = 'localhost';
	$GLOBALS['dbname'] = 'id3506608_cgi';
	$do = $_GET['do'];
	if(!empty($do)){
		switch($do){
			case 'place':
			place();
			break;
			case 'myorders':
			yourorders();
			break;
			case 'delete':
			delete();
			break;
			case 'allorders':
			allorders();
			break;
			case 'ready':
			ready();
			break;
			default:
			echo 0;
		}
	}
	function place(){
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
	if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
	}
		$data = $_GET['data'];
		$obj = json_decode($data);
		$c = ",";$q = "'";
		$obj->status = 0;
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
	function delete(){
	
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		if ($conn->connect_error) {
	    	die("DB Connection failed: " . $conn->connect_error);
		}

		$id = $_GET['data'];
		$sql = "DELETE FROM `id3506608_cgi`.`orders` WHERE `orders`.`id` = ".$id;
		if ($conn->query($sql) === TRUE) {
		    echo 1;
		} else {
		    echo $conn->error;
		}
		$conn->close();
	}
	function yourorders(){
			
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
	if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
	}
		$data = $_GET['data'];
		if(!is_numeric($data)) {
			echo 'Nice Try but Im secured man!!';
			return;
		};
		$query = "SELECT * FROM `orders` WHERE `userid` = ".$data." ORDER BY `id` DESC, `status` ASC";
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
	function allorders(){
			
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
	if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
	}

	$query = "SELECT * FROM `orders` ORDER BY `status` ASC, `id` DESC";
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
	function ready(){
		
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		if ($conn->connect_error) {
	    	die("DB Connection failed: " . $conn->connect_error);
		}

		$id = $_GET['data'];
		$sql = "UPDATE  `id3506608_cgi`.`orders` SET  `status` =  '1' WHERE  `orders`.`id` =".$id;
		if ($conn->query($sql) === TRUE) {
		    echo 1;
		} else {
		    echo $conn->error;
		}
		$conn->close();
	}

?>