<?php
	$GLOBALS['username'] = 'id3506608_sreejith';
	$GLOBALS['password'] = 'cgipassword';
	$GLOBALS['host'] = 'localhost';
	$GLOBALS['dbname'] = 'id3506608_cgi';
	$do = $_GET['do'];
	if(!empty($do)){
		switch($do){
			case 'place':
			place();
			break;
			case 'newid':
			newid();
			break;
			case 'msg':
			sendFCM($_GET['msg'],$_GET['id']);
			break;
			case 'token':
			token();
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
			case 'changename':
			changename();
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
	function newid(){
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		if ($conn->connect_error) {die("DB Connection failed: " . $conn->connect_error);}
		$name = $_GET['name'];

		$sql = "INSERT INTO `id3506608_cgi`.`shops`(`username`) VALUES ('".$name."')";

		if ($conn->query($sql) === TRUE) {
		    $last_id = $conn->insert_id;
		    echo $last_id;
		} else {
		    echo "error";
		    echo $conn->error;
		}
		$conn->close();
	}
	function token(){
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		if ($conn->connect_error) {die("DB Connection failed: " . $conn->connect_error);}
		$id = $_GET['id'];
		$token = $_GET['token'];

		$sql = "UPDATE  `id3506608_cgi`.`shops` SET  `token` =  '".$token."' WHERE  `shops`.`userid` =".$id;

		if ($conn->query($sql) === TRUE) {
		    echo 1;
		} else {
		    echo $conn->error;
		}
		$conn->close();
	}
	function changename(){
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		if ($conn->connect_error) {die("DB Connection failed: " . $conn->connect_error);}
		$id = $_GET['id'];
		$name = $_GET['name'];

		$sql = "UPDATE  `id3506608_cgi`.`shops` SET  `username` =  '".$name."' WHERE  `shops`.`userid` =".$id;

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
	    	die("DB Connection failed: ".$conn->connect_error);
		}

		$id = $_GET['data'];
		$sql = "UPDATE  `id3506608_cgi`.`orders` SET  `status` =  '1' WHERE  `orders`.`id` =".$id;
		if ($conn->query($sql) === TRUE) {
		    echo 1;
		    notify($id);
		} else {
		    echo $conn->error;
		}
		$conn->close();
	}

	function notify($orderid){
		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		if ($conn->connect_error) {
	    	die("DB Connection failed: ".$conn->connect_error);
		}

		$sql = "SELECT `userid` FROM `orders` WHERE `id` = '".$orderid."'";
		$id = $conn->query($sql)->fetch_assoc();
		if ($conn->query($sql) !== TRUE) {echo $conn->error;}
		$conn->close();

		sendFCM($orderid,$id['userid']);
	}

	function sendFCM($mess,$id) {

		$conn = new mysqli($GLOBALS['host'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		if ($conn->connect_error) {
	    	die("DB Connection failed: ".$conn->connect_error);
		}

		$sql = "SELECT `token` FROM `shops` WHERE `userid` = '".$id."'";

		$token = $conn->query($sql)->fetch_assoc();

		if ($conn->query($sql) === FALSE) {echo $conn->error;}
		
		$url = 'https://fcm.googleapis.com/fcm/send';
		$fields = array (
		        'to' => $token['token'],
		        'notification' => array (
		                "body" => "Your order #".$mess." is ready",
		                "title" => "Order ready!",
		                "icon" => "img/logo.png"
		        )
		);
		$fields = json_encode ( $fields );
		$headers = array (
		        'Authorization: key=' . "AAAAMxRWV8Q:APA91bEkcp5MK3SJrBOYgP_HsAhGgynBSql4XZEy_MtP_sqoUAUXj4nZgPgmOEYjBVD10ptDCSB6T2U8pkgmHkV66rN88KjUIjB2I0SvZRsFakwuzY3bJcBhJ37WEQdIH7yGrKqgfX2F",
		        'Content-Type: application/json'
		);

		$ch = curl_init ();
		curl_setopt ( $ch, CURLOPT_URL, $url );
		curl_setopt ( $ch, CURLOPT_POST, true );
		curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, $fields );

		$result = curl_exec ( $ch );
		curl_close ( $ch );
		$conn->close();
	}
?>