const CACHE = "v1"

this.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache =>
        cache.addAll([
          "/",
          "/manifest.json",
          "/logo192.png",
          "/favicon.ico"
        ])
      )
      .then(() => {
        this.skipWaiting()
      })
  )
})

this.addEventListener("fetch", event => {
    if (event.request.url.indexOf("http") === -1) return
    return event.respondWith(
      caches.match(event.request)
        .then(cres => {
          return cres || fetch(event.request)
            .then(fres => {
              if (!(event.request.url.includes("/static/"))) {
                return fres
              } else {
                return caches.open(CACHE)
                  .then(cache => {
                    cache.put(event.request, fres.clone())
                    return fres
                  })
              }
            })
        })
        .catch(() => caches.match("Network ERROR"))
    )
  }
)