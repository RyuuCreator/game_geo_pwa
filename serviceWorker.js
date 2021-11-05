const staticCacheName = "cache-v1";
const assets = [
	"/game_geo_pwa/",
	"/game_geo_pwa/index.html",
	"/game_geo_pwa/offline.html",
	"/game_geo_pwa/map.html",
	"/game_geo_pwa/assets/css/normalize.css",
	"/game_geo_pwa/assets/css/styles.css",
	"/game_geo_pwa/assets/js/game.js",
	"/game_geo_pwa/assets/js/map.js",
	"/game_geo_pwa/assets/js/script.js",
	"/game_geo_pwa/assets/img/logo/rct-web-dev-white-1.png",
	"/game_geo_pwa/assets/img/icons/icon-192x192.png",
	"/game_geo_pwa/assets/img/tileset.png",
];

// AJOUT FICHIERS EN CACHE

self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then(function (response) {
			// Cache hit - return response
			if (response) {
				return response;
			}

			// IMPORTANT: Cloner la requête.
			// Une requete est un flux et est à consommation unique
			// Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
			let fetchRequest = e.request.clone();

			return fetch(fetchRequest).then(function (response) {
				if (!response || response.status !== 200 || response.type !== "basic") {
					return response;
				}

				// IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
				let responseToCache = response.clone();

				caches.open(staticCacheName).then(function (cache) {
					cache.put(e.request, responseToCache);
				});

				return response;
			});
		})
	);
});

// SUPPRIMER LE CACHE QUI N'EST PAS IDENTIQUE AU NOUVEAU

self.addEventListener("install", () => {
	self.skipWaiting();
});

self.addEventListener("activate", (e) => {
	clients.claim();
	e.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(
				keys.map((key) => {
					if (!key.includes(staticCacheName)) {
						caches.delete(key);
					}
				})
			);
		})()
	);
});
