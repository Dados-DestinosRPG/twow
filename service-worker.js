const cacheName = 'pwa-monstro-v1.2.5';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './monster/1/level1Backside.png',
  './monster/1/1.png',
  './monster/1/2.png',
  './monster/1/3.png',
  './monster/1/4.png',
  './monster/1/5.png',
  './monster/1/6.png',
  './monster/1/7.png',
  './monster/1/8.png',
  './monster/1/9.png',
  './monster/1/10.png',
  './monster/2/level2Backside.png',
  './monster/2/1.png',
  './monster/2/2.png',
  './monster/2/3.png',
  './monster/2/4.png',
  './monster/2/5.png',
  './monster/2/6.png',
  './monster/2/7.png',
  './monster/2/8.png',
  './monster/2/9.png',
  './monster/2/10.png',
  './monster/2/11.png',
  './monster/2/12.png',
  './monster/3/level3Backside.png',
  './monster/3/1.png',
  './monster/3/2.png',
  './monster/3/3.png',
  './monster/3/4.png',
  './monster/3/5.png',
  './monster/3/6.png',
  './monster/3/7.png',
  './monster/3/8.png',
  './token/ForestBack.png',
  './token/MountainBack.png',
  './token/WaterBack.png',
  './token/carpeado.png',
  './token/1.png',
  './token/2.png',
  './token/3.png',
  './token/4.png',
  './token/5.png',
  './token/6.png',
  './token/7.png',
  './token/8.png',
  './token/9.png',
  './token/10.png',
  './token/11.png',
  './token/12.png',
  './token/13.png',
  './token/14.png',
  './token/15.png',
  './token/16.png',
  './token/17.png',
  './token/18.png',
  './token/19.png',
  './token/20.png',
  './token/21.png',
  './token/true.png',
  './token/false.png',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== cacheName && caches.delete(key)))
    )
  );
  self.clients.claim();
});