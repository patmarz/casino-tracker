const VERSION="1.1.1";const CACHE="casino-cache-"+VERSION;const ASSETS=["./","./index.html?rev="+VERSION,"./manifest.json?rev="+VERSION,"./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("casino-cache-")&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(ca=>ca.put(r,cp));return res}).catch(()=>caches.match("./index.html?rev="+VERSION))))});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',async()=>{const cs=await clients.matchAll({type:'window'});for(const c of cs){c.postMessage('SW_UPDATE_READY')}});
