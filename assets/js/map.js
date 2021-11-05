// GEOLOCATION

if (navigator.geolocation) {
	// L'API est disponible
	navigator.geolocation.getCurrentPosition(success, fail);
} else {
	// Pas de support, proposer une alternative ?
}

// DEMANDE L'AUTORISATION ET RECUPERE LA POSITION

function success(position) {
	mapboxgl.accessToken =
		"pk.eyJ1Ijoicnl1dWNyZWF0b3IiLCJhIjoiY2t2amRhZ2t1MnY2eDMxcGdxbTRudG5iaCJ9.Tx3PGv-8qX0b1SJ64wchBg";
	const map = new mapboxgl.Map({
		container: "map", // Container ID
		style: "mapbox://styles/ryuucreator/ckvjdv32v02sk14oukm1dnq4t", // Map style to use
		center: [position.coords.longitude, position.coords.latitude], // Starting position [lng, lat]
		zoom: 12, // Starting zoom level
	});

	// MARKER PAR DEFAULT

	// const marker = new mapboxgl.Marker() // initialize a new marker
	// 	.setLngLat([position.coords.longitude, position.coords.latitude]) // Marker [lng, lat] coordinates
	// 	.addTo(map); // Add the marker to the map

	// MARKER CUSTOM

	// add markers to map
	// create a HTML element for each feature
	const el = document.createElement("map");
	el.className = "marker";

	// make a marker for each feature and add to the map
	new mapboxgl.Marker(el)
		.setLngLat([position.coords.longitude, position.coords.latitude])
		.addTo(map);

	// RECHERCHE

	const geocoder = new MapboxGeocoder({
		// Initialize the geocoder
		accessToken: mapboxgl.accessToken, // Set the access token
		mapboxgl: mapboxgl, // Set the mapbox-gl instance
		marker: {
			color: "#FF3333",
		}, // Do not use the default marker style
		placeholder: '"Entrer votre ville ici !"',
	});

	// Add the geocoder to the map
	map.addControl(geocoder);
}

function fail() {
	mapboxgl.accessToken =
		"pk.eyJ1Ijoicnl1dWNyZWF0b3IiLCJhIjoiY2t2amRhZ2t1MnY2eDMxcGdxbTRudG5iaCJ9.Tx3PGv-8qX0b1SJ64wchBg";
	const map = new mapboxgl.Map({
		container: "map", // identifiant du conteneur de la carte
		style: "mapbox://styles/ryuucreator/ckvjdv32v02sk14oukm1dnq4t", // URL du style à utiliser
		center: [2, 45], // position par defaut [lng, lat]
		zoom: 2, // zoom par defaut
	});

	// RECHERCHE

	const geocoder = new MapboxGeocoder({
		// Initialize the geocoder
		accessToken: mapboxgl.accessToken, // Set the access token
		mapboxgl: mapboxgl, // Set the mapbox-gl instance
		marker: {
			color: "#FF3333",
		}, // Do not use the default marker style
		placeholder: "Monde",
	});

	// Add the geocoder to the map
	map.addControl(geocoder);
}
