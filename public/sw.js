// Service Worker for caching brochure images
const CACHE_NAME = 'brochure-cache-v1';
const GOOGLE_DRIVE_CACHE = 'google-drive-cache-v1';

// Install event - setup cache
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== GOOGLE_DRIVE_CACHE) {
            console.log('Service Worker: Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - cache Google Drive images
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only cache Google Drive images
  if (url.hostname === 'drive.google.com' && 
      (url.pathname.includes('/uc') || url.pathname.includes('/file/d/'))) {
    
    event.respondWith(
      caches.open(GOOGLE_DRIVE_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('Service Worker: Serving from cache:', url.pathname);
            return cachedResponse;
          }

          return fetch(event.request).then((response) => {
            // Only cache successful responses
            if (response && response.status === 200) {
              console.log('Service Worker: Caching new resource:', url.pathname);
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch((error) => {
            console.error('Service Worker: Fetch failed:', error);
            throw error;
          });
        });
      })
    );
  }
});
