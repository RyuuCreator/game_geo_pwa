/* OFFLINE / ONLINE */

function updateStatus() {
	if (navigator.onLine) {
		// console.log("Votre connection est de retour.");
		document.location.href = "/game_geo_pwa/index.html";
	} else {
		// console.log("Vous avez perdu votre connexion.");
		document.location.href = "/game_geo_pwa/offline.html";
	}
}

window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

/* VERIFIE LE SERVICE WORKER DANS LE CACHE */

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/game_geo_pwa/serviceWorker.js")
		.then(() => console.log("sw registered"))
		.catch((err) => console.log(err));
}

/* A2HS => ADD TO HOME SCREEN */

let deferredPrompt;
const addBanner = document.querySelector(".add-banner");
addBanner.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI to notify the user they can add to home screen
	addBanner.style.display = "block";

	addBanner.addEventListener("click", () => {
		// hide our user interface that shows our A2HS button
		addBanner.style.display = "none";
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === "accepted") {
				// console.log("User accepted the A2HS prompt");
			} else {
				// console.log("User dismissed the A2HS prompt");
			}
			deferredPrompt = null;
		});
	});
});

/* NOTIFICATION */

let permission = document.getElementById("push-permission");
if (Notification.permission !== "default") {
	permission.style.display = "none";
}

permission.addEventListener("click", function () {
	Notification.requestPermission().then(function (result) {
		// console.log(result);
		if (result !== "default") {
			permission.style.display = "none";
		}
	});
});