<?php

	$username = 'root';
	$password = 'usbw';
	$host = 'localhost';
	$dbname = 'id3506608_cgi';

	$conn = new mysqli($host, $username, $password, $dbname);
	if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
	}

?>