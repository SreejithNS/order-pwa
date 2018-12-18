importScripts('https://www.gstatic.com/firebasejs/3.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.1/firebase-messaging.js');

// Initialize Firebase
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
