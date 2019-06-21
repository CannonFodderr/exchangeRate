/* eslint-disable no-restricted-globals */
/* eslint-disable default-case */

const PRECACHE_URLS = [
    '/',
    'index.html',
    'clipboard.png',
    'reload.png',
    '512S.png',
    '192S.png'
]
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js', {scope: './'})
    .then(reg => {
        reg.onupdatefound = () => {
            const installingWorker = reg.installing
            installingWorker.onstatechange = () => {
                switch(installingWorker.state){
                    case 'installed':
                        if(navigator.serviceWorker.controller) {
                            const confirmed = confirm("Update is available")
                            if(confirmed) reg.update()
                        }
                        break
                    default: return
                }
            }
        }
    })
    .catch(err => console.error(err))
} 
self.addEventListener('activate', event => {
    console.log("SW Activated")
})


self.addEventListener('install', event => {
    console.log("Installing SW....")
    event.waitUntil(
        caches.open('v1')
        .then(cache => {
            cache.addAll(PRECACHE_URLS)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function fetcher (event) {
    var request = event.request;
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(request);
            })
        );
});