<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
      <title>Order</title>
      <meta name="keywords" content="orders,order,jithu,appalam,products,tirupattur,order,wholesale,manufacturer,buy,delivery"/>
      <meta name="description" content="Make your orders at ease - Jithu Group,India. (Only wholesale orders are taken)"/>
      <meta name="author" content="Jithu Group - TN,India">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="theme-color" content="#7b1fa2">
      <script type="text/javascript" src="js/jquery.min.js"></script><script type="text/javascript" src="js/bootstrap.min.js" async="true"></script><script type="text/javascript" src="js/alerty.min.js"></script>
      <link rel="manifest" href="/manifest.json">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!--link type="text/css" rel="preload" href="css/materialize.min.css" as='style' onload="this.onload=null;this.rel='stylesheet'" media="screen,projection"/-->
      <!--link rel="preload" type="text/css" href="css/bootstrap.min.css" as='style' onload="this.onload=null;this.rel='stylesheet'" /-->
      <link href="style.css" as='style' onload="this.onload=null;this.rel='stylesheet'" rel="preload" type="text/css" media="screen"/>
      <link rel="preload" type="text/css" href="css/alerty.css" as='style' onload="this.onload=null;this.rel='stylesheet'" />
      <noscript>
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection"/>
      <link href="style.css" rel="stylesheet" type="text/css" media="screen"/>
      <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
      <link rel="stylesheet" type="text/css" href="css/alerty.css" />
      </noscript>
   </head>
   <body>
      <div id="cover" style="position: fixed; height: 100%; width: 100%; top:0; left: 0; background: #000; z-index:9999;"></div>
      <ul id="slide-out" class="sidenav">
         <li>
            <div class="user-view">
               <div class="background"> <img src="img/back.jpg"> </div>
               <a href="#name"><span id="app-username" class="white-text name">Sreejith N</span></a> <a href="#email"><span id="app-userid" class="white-text number">nssreejith229@gmail.com</span></a>
            </div>
         </li>
         <li><a href="#" onclick="app.clickPage('yourorders')"><i class="material-icons">featured_play_list</i>Your orders</a></li>
         <li><a href="#" onclick="app.clickPage('additem')"><i class="material-icons">add_box</i>New Order</a></li>
         <li><a href="#" onclick="app.clickPage('settings')"><i class="material-icons">settings</i>Settings</a></li>
         <li>
            <div class="divider"></div>
         </li>
         <li><a class="subheader">Created by Sreejith N</a></li>
         <li><a class="waves-effect" href="#!">Jithu Appalam Products</a></li>
      </ul>
      <div class="page" id="page-orderlist">
         <div class="section z-depth-3" style="padding: 16px 16px 16px 16px;background-color: #9c27b0;height: 56px;">
         <h3 style="margin-bottom: 0px;/* vertical-align: 2px; */font-size: 24px;color: #ffffff;font-family: sans-serif;"><i class="medium material-icons click menu" style="vertical-align: -4px;margin-right: 14px;font-size: 24px;">menu</i>Order Queue</h3>
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
                  <tbody id="order-list"></tbody>
               </table>
            </div>
            <div class="row">
               <div class="col s4"><button onclick="app.clickPage('additem')" class="waves-effect waves-purple grey-text btn-flat">Add Items<i class="material-icons right" style="vertical-align: 4px">add</i></button></div>
            </div>
         </div>
         <div class="fixed-action-btn"> <a class="btn-floating btn-large waves-effect waves-light purple" onclick="orders.submit()"> <i class="material-icons right">send</i> </a></div>
      </div>
      <div class="page" id="page-settings">
         <div class="section z-depth-3" style="padding: 16px 16px 16px 16px;background-color: #9c27b0;height: 56px;">
         <h3 style="margin-bottom: 0px;/* vertical-align: 2px; */font-size: 24px;color: #ffffff;font-family: sans-serif;"><i class="medium material-icons click menu" style="vertical-align: -4px;margin-right: 14px;font-size: 24px;">menu</i>Settings</h3>
         </div>
         <div class="container">
            <div class="section">
               <table class="striped highlight ">
                  <thead>
                     <tr>
                        <th>Sales Mode</th>
                        <th class="right">
                           <div class="switch">
                            <label>
                              Off
                              <input id="salesmode" onclick="app.changeMode($(this).prop('checked'))" type="checkbox">
                              <span class="lever"></span>
                              On
                            </label>
                          </div>
                        </th>
                     </tr>
                  </thead>
               </table>
            </div>
         </div>
         <div class="fixed-action-btn"> <a class="btn-floating btn-large waves-effect waves-light purple" onclick="orders.submit()"> <i class="material-icons right">send</i> </a></div>
      </div>
      <div class="page" id="page-yourorders">
         <div class="section z-depth-3" style="padding: 16px 16px 16px 16px;background-color: #9c27b0;height: 56px;">
         <h3 style="margin-bottom: 0px;/* vertical-align: 2px; */font-size: 24px;color: #ffffff;font-family: sans-serif;"><i class="medium material-icons click menu" style="vertical-align: -4px;margin-right: 14px;font-size: 24px;">menu</i>Orders</h3>
         </div>
         <div class="container" id="ordered">
            <div class="section"></div>
            <div class="marginpadding">
               <div class="row z-depth-3 roundpadding">
                  <div class="col s2 center">
                     <span class="grey-text">Loading</span><br>
                     <h7>
                        <div class="tiny preloader-wrapper small active">
                           <div class="spinner-layer spinner-blue-only">
                              <div class="circle-clipper left">
                                 <div class="circle"></div>
                              </div>
                              <div class="gap-patch">
                                 <div class="circle"></div>
                              </div>
                              <div class="circle-clipper right">
                                 <div class="circle"></div>
                              </div>
                           </div>
                        </div>
                     </h7>
                  </div>
               </div>
            </div>
         </div>
         <div style="position: absolute;">
            <div class="fixed-action-btn">
               <a class="btn-floating btn-large waves-effect waves-light purple" id="orderedmenu" onclick="app.clickPage('additem');$('.tap-target').next()"> <i class="large material-icons">add</i> </a> 
               <div class="tap-target" data-target="orderedmenu">
                  <div class="tap-target-content">
                     <h5>Order!</h5>
                     <p>Tap here to place an order</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="page" id="page-additem">
         <div class="section z-depth-3" style="padding: 16px 16px 16px 16px;background-color: #9c27b0;height: 56px;">
         <h3 style="margin-bottom: 0px;/* vertical-align: 2px; */font-size: 24px;color: #ffffff;font-family: sans-serif;"><i class="medium material-icons click" style="vertical-align: -4px;margin-right: 14px;font-size: 24px;" id="but-home">navigate_before</i>Add Items</h3>
         </div>
         <div class="container">
            <div class='section'>
               <p class="fn1 grey-text">Select the Brand</p>
               <div class="nav nav-pill btn-group fn2" role="group" aria-label="First group"> <button type="button" class="btn fn1 pink darken-3" data-toggle="pill" href="#tab-jithu">Jithu</button> <button type="button" class="btn fn1 pink darken-3" data-toggle="pill" href="#tab-super">Super</button> </div>
               <div class="tab-content">
                  <div id="tab-jithu" class="tab-pane fade in active">
                     <br>
                     <p class="fn1 grey-text">Round</p>
                     <div class="btn-group " role="group" aria-label="First group"> <button type="button" class="btn fn2 pink darken-4 itembut" data-mass="300g" data-price="">A1</button> <button type="button" class="btn fn2 pink darken-4 itembut" data-mass="200g" data-price="">No. 2</button> <button type="button" class="btn fn2 pink darken-4 itembut" data-mass="150g" data-price="">No. 3</button> <button type="button" class="btn fn2 pink darken-4 itembut" data-mass="100g" data-price="">No. 4</button></div>
                     <br><br>
                     <p class="fn1 grey-text">Round Specials</p>
                     <div class="btn-group " role="group" aria-label="First group"> <button type="button" class="btn fn1 pink darken-4 itembut" data-mass="50g" data-price="">Baby</button> <button type="button" class="btn fn1 pink darken-4 itembut" data-mass="200g" data-price="">Box</button> <button type="button" class="btn fn2 pink darken-4 itembut" data-mass="500g" data-price="">No. 2/3</button> </div>
                     <br><br>
                     <p class="fn1 grey-text">Chips</p>
                     <div class="btn-group " role="group" aria-label="First group"> <button type="button" class="btn fn2 pink darken-4 itembut" data-price="">50g</button> <button type="button" class="btn fn2 pink darken-4 itembut" data-price="">500g</button> <button type="button" class="btn fn2 pink darken-4 itembut" data-price="">80g</button> <button type="button" class="btn fn2 pink darken-4 itembut" data-price="">Spcl 100g</button> </div>
                  </div>
                  <div id="tab-super" class="tab-pane fade">
                     <h3>Menu 1</h3>
                     <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
               </div>
               <br>
               <div class="section" id="templist"> </div>
            </div>
            <div class="fixed-action-btn">
               <a class="btn-floating btn-large waves-effect waves-light purple" id="orderlistmenu" onclick="orders.save()"> <i class="large material-icons">done</i> </a> 
               <div class="tap-target" data-target="orderlistmenu">
                  <div class="tap-target-content">
                     <h5>Add Item</h5>
                     <p>Tap here to add items to your order</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </div>
      <script src="https://www.gstatic.com/firebasejs/5.7.0/firebase.js"></script>
      <script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js"></script>
      <script type="text/javascript" src="js/materialize.min.js"></script>
      <script type="text/javascript" src="js/index.js"></script>
      <script>
        var config = {
          apiKey: "AIzaSyAbV6lbG1eMOuOVcNxJ5Nbih3Ngvw_Yc90",
          authDomain: "orders-pwa.firebaseapp.com",
          databaseURL: "https://orders-pwa.firebaseio.com",
          projectId: "orders-pwa",
          storageBucket: "orders-pwa.appspot.com",
          messagingSenderId: "219384534980"
        };
        firebase.initializeApp(config);

        const messaging = firebase.messaging();

         messaging.requestPermission()
         .then(function() {
           console.log('Notification permission granted.');
           return messaging.getToken();
         })
         .then(function(token) {
           console.log(token);//Display token
           setTimeout(()=>app.updateToken(token),5000); //Update the token to the server.
         })
         .catch(function(err) { // Happen if user deney permission
           console.log('Unable to get permission to notify.', err);
         });

         messaging.onMessage(function(payload){
            console.log('onMessage',payload);
            orders.getOrders()
         })
         messaging.onTokenRefresh(function() {
           messaging.getToken().then(function(refreshedToken) {
             console.log('Token refreshed.');
             app.updateToken(token)
             // ...
           }).catch(function(err) {
             console.log('Unable to retrieve refreshed token ', err);
           });
           });
      </script>
   </body>
</html>