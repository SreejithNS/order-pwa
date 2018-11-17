const cacheName = 'v1.9';


const cacheAssets = [
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/alerty.css",
  "/js/alerty.min.js",
  "/js/bootstrap.min.js",
  "js/jquery.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/css/bootstrap.min.css",
  "/js/index.js",
  "/style.css",
  "/img/back.jpg",
  "/manifest.json",
  "https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/index.php"
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});
////
// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
var i = 0;
self.addEventListener('message', function(event) {
    var data = event.data;

    if (data.do == "cacheName") {
        event.ports[i++].postMessage({
            "data": cacheName
        });
    }
});

