<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Order</title>
	<link rel="manifest" href="/manifest.json">
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link href="style.css" rel="stylesheet" type="text/css" media="screen" />
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
	<meta name="theme-color" content="#7b1fa2">
	<script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	<script type="text/javascript" src="js/alerty.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/alerty.css">
</head>

<body>
	<ul id="slide-out" class="sidenav">
		<li><div class="user-view">
		  <div class="background">
		    <img src="img/back.jpg">
		  </div>
		  <!---a href="#user"><img class="circle" src="images/yuna.jpg"></a--->
		  <a href="#name"><span id="app-username" class="white-text name">Sreejith N</span></a>
		  <a href="#email"><span id="app-userid" class="white-text number">nssreejith229@gmail.com</span></a>
		</div></li>
		<li><a href="#"><i class="material-icons">featured_play_list</i>Your orders</a></li>
		<li><a href="#"><i class="material-icons">add_box</i>New Order</a></li>
		<li><div class="divider"></div></li>
		<li><a class="subheader">Created by Sreejith N</a></li>
		<li><a class="waves-effect" href="#!">Jithu Appalam Products</a></li>
	</ul>
	
	<div class="page" id="page-orderlist">
		<div class="section z-depth-3" style="padding: 1rem 0rem 1rem 0.8rem;">
			<h3 style="margin-bottom: 0px;"><i class="medium material-icons click" style="vertical-align: -8px;margin-right:5px;font-size: 2.5rem">menu</i>Order Please</h3>
		</div>
		<div class="container">
			<div class="section">
			<table class="striped highlight ">
				<thead>
					<tr>
						<th></th>
						<th>Item</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody id="order-list">
				</tbody>
			</table>
			</div>
			<div class="row">
				<div class="col s4">
					<button onclick="orders.submit()" class="btn waves-effect waves-light purple white-text">Send
						<i class="material-icons right">send</i>
					</button>
				</div>
			</div>	
			<div class="fixed-action-btn">
			  <a class="btn-floating btn-large waves-effect waves-light purple" id="but-additem">
			    <i class="large material-icons">add</i>
			  </a>
			</div>
		</div>
	</div>
	<div class="page" id="page-yourorders">
		<div class="section z-depth-3" style="padding: 1rem 0rem 1rem 0.8rem;">
			<h3 style="margin-bottom: 0px;"><i class="medium material-icons click" style="vertical-align: -8px;margin-right:5px;font-size: 2.5rem">menu</i>Your Orders</h3>
		</div>
		<div class="container" id="ordered">
			<div class="section"></div>
			<div class="marginpadding">
				<div class="row z-depth-3 roundpadding">
					<div class="col s2">
						<span class="grey-text">ORDER ID #</span><span class="grey-text">22</span>
						<h3>Ordered</h3>
						<span class="grey-text"></span>
					</div>

					<div class="col s12 centered">
						<span class="grey-text">Items</span><br>
						<div class="chip" >NO. 4 3</div><div class="chip" >NO. 4 3</div><div class="chip" >NO. 4 3</div><div class="chip" >NO. 4 3</div><div class="chip" >NO. 4 3</div>
					</div>
				</div>
			</div>
					
			<div class="fixed-action-btn">
			  <a class="btn-floating btn-large waves-effect waves-light purple" id="but-additem">
			    <i class="large material-icons">add</i>
			  </a>
			</div>
		</div>
	</div>
	<div class="page" id="page-additem">
		<div class="section purple white-text z-depth-3" style="padding: 1rem 0rem 1rem 0.8rem;">
				<h3 style="margin-bottom: 0px;"><i class="material-icons click" style="vertical-align: -8px;margin-right:5px;font-size: 2.5rem" id="but-home">navigate_before</i> Add Item to your order</h4>
		</div>
		<div class="container">
			<div class='section'>
				<p class="fn1 grey-text">Select the Brand</p>
				 <div class="nav nav-pill btn-group fn2" role="group" aria-label="First group">
				    <button type="button" class="btn fn1 pink darken-3" data-toggle="pill" href="#tab-jithu">Jithu</button>
				    <button type="button" class="btn fn1 pink darken-3" data-toggle="pill" href="#tab-super">Super</button>
			  	  </div>
				  <div class="tab-content">
				    <div id="tab-jithu" class="tab-pane fade in active">
				    	<br>
				      <p class="fn1 grey-text">Round</p>
						<div class="btn-group " role="group" aria-label="First group">
						    <button type="button" class="btn fn2 pink darken-4 itembut">A1</button>
						    <button type="button" class="btn fn2 pink darken-4 itembut">2</button>
						    <button type="button" class="btn fn2 pink darken-4 itembut">3</button>
						    <button type="button" class="btn fn2 pink darken-4 itembut">4</button>
						    <button type="button" class="btn fn1 pink darken-4 itembut">Baby</button>
						    <button type="button" class="btn fn1 pink darken-4 itembut">Box</button>
						    <button type="button" class="btn fn2 pink darken-4 itembut">2/3</button>
					  	</div>
					  	<br><br>
					  	<p class="fn1 grey-text">Chips</p>
					  	<div class="btn-group " role="group" aria-label="First group">
						    <button type="button" class="btn fn2 pink darken-4 itembut">50g</button>
						    <button type="button" class="btn fn2 pink darken-4 itembut">500g</button>
						    <button type="button" class="btn fn2 pink darken-4 itembut">80g</button>
						    <button type="button" class="btn fn2 pink darken-4 itembut">Spcl 100g</button>
					  	</div>
				    </div>
				    <div id="tab-super" class="tab-pane fade">
				      <h3>Menu 1</h3>
				      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				    </div>
				  </div><br>
				  <div class="section" id="templist">
				  </div>
			</div>
			<div class="fixed-action-btn">
			  <a class="btn-floating btn-large waves-effect waves-light purple" onclick="orders.save()">
			    <i class="large material-icons">done</i>
			  </a>
			</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="js/materialize.min.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
</body>
		