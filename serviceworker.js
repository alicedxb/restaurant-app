// Cache name
let cachedVersion = 'restaurant-cache';

// Adds elements to cache in array
let cacheFiles = [
    './',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    './js/sw/index.js',
    './js/sw/sw.js',
    './index.html',
    './restaurant.html'
];

// Installs the service worker, code from: https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('install ', function(e) {
    e.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(urlToCache);
        })
    );
});

// Activates cache and removes previous caches, code from: https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetches cache and add new elements to cache, code from: https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.open(staticCacheName).then(function(cache) {
        return cache.match(e.request).then(function (response) {
          return response || fetch(e.request).then(function(response) {
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });
