const CACHE_NAME="version-1",urlsToCache=["index.html"],self=this;"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("./sw.js").then((e=>console.log("Success: ",e.scope))).catch((e=>console.log("Failure: ",e)))})),this.addEventListener("install",(e=>{e.waitUntil(caches.open(CACHE_NAME).then((e=>(console.log("Opened cache"),e.addAll(urlsToCache)))))})),this.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((()=>fetch(e.request).catch((()=>caches.match("index.html"))))))})),this.addEventListener("activate",(e=>{const t=[];t.push(CACHE_NAME),e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(!t.includes(e))return caches.delete(e)}))))))}));