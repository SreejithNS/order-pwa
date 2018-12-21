<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Order</title>
	<!--link rel="manifest" href="/manifest.json"-->
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="../css/materialize.min.css"  media="screen,projection"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link href="../style.css" rel="stylesheet" type="text/css" media="screen" />
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
	<meta name="theme-color" content="#7b1fa2">
	<script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	<script type="text/javascript" src="../js/alerty.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../css/alerty.css">
</head>

<body>
	<ul id="slide-out" class="sidenav">
		<li><div class="user-view">
		  <div class="background">
		    <img src="../img/back.jpg">
		  </div>
		  <!---a href="#user"><img class="circle" src="images/yuna.jpg"></a--->
		  <a href="#name"><span id="app-username" class="white-text name">Sreejith N</span></a>
		  <a href="#email"><span id="app-userid" class="white-text number">nssreejith229@gmail.com</span></a>
		</div></li>
		<li><a href="#" onclick="app.clickPage('orders')"><i class="material-icons">featured_play_list</i>Orders</a></li>
		<li><div class="divider"></div></li>
		<li><a class="subheader">Created by Sreejith N</a></li>
		<li><a class="waves-effect" href="#!">Jithu Appalam Products</a></li>
	</ul>

	<div class="page" id="page-orders">
		<div class="section z-depth-3" style="padding: 1rem 0rem 1rem 0.8rem;">
			<h3 style="margin-bottom: 0px;"><i class="medium material-icons click menu" style="vertical-align: -8px;margin-right:5px;font-size: 2.5rem">menu</i>Orders</h3>
		</div>
		<div class="container" id="ordered">
			<div class="section"></div>
			<div class="marginpadding">
				<div class="row z-depth-3 roundpadding">
					<div class="col s2 center">
						<span class="grey-text">Loading</span><br><h7><div class="tiny preloader-wrapper small active">
						    <div class="spinner-layer spinner-blue-only">
						      <div class="circle-clipper left">
						        <div class="circle"></div>
						      </div><div class="gap-patch">
						        <div class="circle"></div>
						      </div><div class="circle-clipper right">
						        <div class="circle"></div>
						      </div>
						    </div>
						  </div></h7>
					</div>
				</div>
			</div>
		</div>
		<div class="fixed-action-btn">
			  <a class="btn-floating btn-large waves-effect waves-light purple" id="orderedmenu" onclick="app.clickPage('orderlist');$('.tap-target').next()">
			    <i class="large material-icons">add</i>
			  </a>
			  <div class="tap-target" data-target="orderedmenu">
			    <div class="tap-target-content">
			      <h5>Order!</h5>
			      <p>Tap here to place an order</p>
			    </div>
			  </div>
			</div>
	</div>
	
</body>
	<script type="text/javascript" src="../js/materialize.min.js"></script>
	<script type="text/javascript" src="js/index.js"></script>