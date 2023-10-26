'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "de2bc343eee6267e9b30624787abdf7a",
"assets/AssetManifest.json": "f79fa212b74e2c976151e3ba3e286ef9",
"assets/assets/animations/astronaut_gazing.json": "8c9d2be56160f60892cb263b21bac2f5",
"assets/assets/animations/astronaut_lottie.json": "8a90d663c8a1ff11cb0379a4fe9dccc9",
"assets/assets/animations/developer_lottie.json": "086830af5f2d879ae63aa5808a9f0dc1",
"assets/assets/animations/pacman_loading.json": "7bd38b9427d285b9c48219d13973a56a",
"assets/assets/fonts/Arial%20Italic.ttf": "02bce9f1940e7fe092818f37d244279f",
"assets/assets/fonts/Arial%20regular.ttf": "076966e6786082959d79c4ff9fea9273",
"assets/assets/fonts/Arial%2520Italic.ttf": "02bce9f1940e7fe092818f37d244279f",
"assets/assets/fonts/Arial%2520regular.ttf": "076966e6786082959d79c4ff9fea9273",
"assets/assets/fonts/arial-bold.ttf": "cace6dc6ba96612734e1d1f03da1de0a",
"assets/assets/fonts/RobotoCondensed-Bold.ttf": "e38804ae070b58fbf4fdd88fd6853929",
"assets/assets/fonts/RobotoCondensed-BoldItalic.ttf": "70146deb50d627bc5a157f9bae044a67",
"assets/assets/fonts/RobotoCondensed-Italic.ttf": "94a4ea4f157a6ee51a0191b5ac515bac",
"assets/assets/images/busy_bees_banner.png": "502bdf88ffd6f863126fe4d90134e34f",
"assets/assets/images/gmail_logo.png": "6c9baa013f158d3e9fc323ecd7afad9b",
"assets/assets/images/linkedin_logo.png": "f33b3032dcc4df0e1c28e472742419d4",
"assets/assets/images/nomura_logo.png": "0c937cfebd3721c7b5f7ac2d29b26dbc",
"assets/assets/images/ppm_logo.png": "c54e67a8db30890d08ab771a9e4a689f",
"assets/assets/images/ppm_ui/1.png": "01794e24764d58027d7e2713459aaac1",
"assets/assets/images/ppm_ui/10.png": "4291abce22040e3ff9e23b8fdf176f68",
"assets/assets/images/ppm_ui/2.png": "5cb87fccb85259a78ab7e43d78c58b61",
"assets/assets/images/ppm_ui/3.png": "fa108ef29c76ed89da7274c95dc9cf98",
"assets/assets/images/ppm_ui/5.png": "4b2082a3989fd5055b47889565005675",
"assets/assets/images/ppm_ui/6.png": "ea327ef77080eef99c91c3b9ccce663b",
"assets/assets/images/ppm_ui/7.png": "e7bc6ad916e65554e7ab00d6df3f9fc0",
"assets/assets/images/ppm_ui/8.png": "2248ed5617168b250cc6c53f5f89a962",
"assets/assets/images/ppm_ui/9.png": "bad4b811e4cbe36896d6d25c715449e1",
"assets/assets/images/sst_banner.png": "3076de50b6b644300909b381582689d9",
"assets/assets/images/start_background.jpg": "cc5bd514d3605718c57eee4e181e3bc7",
"assets/FontManifest.json": "6e402b3913cd9b8f13285007e8db463f",
"assets/fonts/MaterialIcons-Regular.otf": "e3b49feb287f5b28d93342cb69c5869c",
"assets/NOTICES": "9a587dbf0867b920c0e9d4f542b021fa",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "f8e01ab30cd10f2c2bccc53208672a2b",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "70c4c570576963a66f902d78ba35b57c",
"/": "70c4c570576963a66f902d78ba35b57c",
"main.dart.js": "3516e2240bf2ea95a415b92c26c7cad1",
"manifest.json": "d8fe34f7ae4c072a77b924e01dac8a50",
"version.json": "9b818ca9511483c901bed1545384376c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
