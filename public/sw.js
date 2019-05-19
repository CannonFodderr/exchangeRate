var CURRENT_CACHES = 'v1'

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js', {scope: './'})
    .then(registration => {
        caches.open('v1', (cache) => {
            cache.put(event.req)
        })
        self.addEventListener('fetch', event => {
            if(event.request.method != 'GET') return
            
            event.respondWith(async () => {
                const cache = await caches.open('v1')
                const cachedResponse = await cache.match(event.request)
                
                if(cachedResponse) {
                    event.waitUntil(cache.add(event.request))
                    return cachedResponse
                }
                return fetch(event.request)
            })
        })
        console.log("SW Registered")
    })
    .catch(err => console.error("Failed to registed SW: ", err))
} else {
    console.log("Serviceworker not supported")
}

// self.addEventListener('activate', function(event) {
//     var expectedCacheNames = Object.values(CURRENT_CACHES);
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (!expectedCacheNames.includes(cacheName)) {
//                         console.log('Deleting out of date cache:', cacheName);
                        
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });
        
        
// if((event.request.url.indexOf('http') === 0)){
//     self.addEventListener('fetch', (event) => {
//         event.respondWith(
//             caches.open('v1')
//             .then(cache => {
//                 return cache.match(event.request)
//                 .then(response => {
//                     if(response) {
//                         console.log("Responded with cache")
//                         return response
//                     }
//                     return fetch(event.request).then((networkResponse) => {
//                         cache.addAll([event.request])
//                         console.group()
//                         console.log("Cache stored")
//                         console.log("Responded with network response")
//                         console.groupEnd()
//                         return networkResponse
//                     })
//                 }).catch(err => console.error("Unable to fetch: ", err))
//             })
//             )
//         })
// }
        
            
            