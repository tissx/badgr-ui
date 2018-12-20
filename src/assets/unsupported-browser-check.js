// Simple feature-based check for old browsers (like IE11)
if (typeof Symbol === "undefined") {
	const request = new XMLHttpRequest();
	request.onload = function() {
		document.write(request.responseText);
	};
	request.open("GET", "/assets/unsupported-browser-warning.html");
	request.send();
}
