(function () {
	'use strict';

	// Simple demo to show that we can load and run JS from gh-pages.
	document.getElementById('status').innerText = 'all systems operational';
	document.querySelectorAll("span.ADDRESS").forEach((span) => {
		span.innerText = location.protocol + '//' + location.host;
	});
})();
