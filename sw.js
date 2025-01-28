const CACHE_NAME = "studio-pay-cache-v1"; // Changed to match app name
const urlsToCache = [
  "./index.html", // Main page (updated filename if changed)
  "./set-by-net-worth.html", // New page for price by artist
  "./styles.css", // Styles (ensure the filename matches)
  "./script.js", // Main JS file (ensure the filename matches)
  "./set-by-net-worth.js", // JS for the other page
  "./manifest.json", // Web app manifest
  "./heart_192.png", // Icon (update if changed)
  "./heart_512.png", // Icon (update if changed)
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache); // Add all updated files to cache
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // Check cache first, then network
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Ensure only the current cache is active
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
