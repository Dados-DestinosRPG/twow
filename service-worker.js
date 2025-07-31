const cacheName = 'pwa-monstro-v1.6.0';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-256.png',
  './icon-512.png',
  './monster/1/level1Backside.webp',
  './monster/1/1.webp',
  './monster/1/2.webp',
  './monster/1/3.webp',
  './monster/1/4.webp',
  './monster/1/5.webp',
  './monster/1/6.webp',
  './monster/1/7.webp',
  './monster/1/8.webp',
  './monster/1/9.webp',
  './monster/1/10.webp',
  './monster/2/level2Backside.webp',
  './monster/2/1.webp',
  './monster/2/2.webp',
  './monster/2/3.webp',
  './monster/2/4.webp',
  './monster/2/5.webp',
  './monster/2/6.webp',
  './monster/2/7.webp',
  './monster/2/8.webp',
  './monster/2/9.webp',
  './monster/2/10.webp',
  './monster/2/11.webp',
  './monster/2/12.webp',
  './monster/3/level3Backside.webp',
  './monster/3/1.webp',
  './monster/3/2.webp',
  './monster/3/3.webp',
  './monster/3/4.webp',
  './monster/3/5.webp',
  './monster/3/6.webp',
  './monster/3/7.webp',
  './monster/3/8.webp',
  './token/forest.webp',
  './token/mountain.webp',
  './token/water.webp',
  './token/carpeado.webp',
  './token/1.webp',
  './token/2.webp',
  './token/3.webp',
  './token/4.webp',
  './token/5.webp',
  './token/6.webp',
  './token/7.webp',
  './token/8.webp',
  './token/9.webp',
  './token/10.webp',
  './token/11.webp',
  './token/12.webp',
  './token/13.webp',
  './token/14.webp',
  './token/15.webp',
  './token/16.webp',
  './token/17.webp',
  './token/18.webp',
  './token/19.webp',
  './token/20.webp',
  './token/21.webp',
  './token/true.webp',
  './token/false.webp',
  './witchers/1.webp',
  './witchers/2.webp',
  './witchers/3.webp',
  './witchers/4.webp',
  './witchers/5.webp',
  './witchers/6.webp',
  './witchers/7.webp',
  './witchers/0.webp',
  './mages/1.webp',
  './mages/2.webp',
  './mages/3.webp',
  './mages/4.webp',
  './mages/5.webp',
  './mages/0.webp'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    }).catch((error) => {
      console.error('Erro ao adicionar arquivos ao cache:', error);
    })
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