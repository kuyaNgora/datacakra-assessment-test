// src/service-worker.ts

/* eslint-disable no-restricted-globals */

// Menangani install event
self.addEventListener("install", (event: ExtendableEvent) => {
  console.log("Service Worker installed.");
  // Menunggu hingga caching selesai
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/main.chunk.js",
        "/static/css/main.chunk.css",
      ]);
    })
  );
});

// Menangani fetch event untuk caching
self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Mengembalikan response dari cache jika ada
      if (cachedResponse) {
        return cachedResponse;
      }
      // Jika tidak ada di cache, fetch dari server
      return fetch(event.request).then((response) => {
        return caches.open("v1").then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// Menangani update atau aktivasi service worker baru
self.addEventListener("activate", (event: ExtendableEvent) => {
  const cacheWhitelist = ["v1"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
