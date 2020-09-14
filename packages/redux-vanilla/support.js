(function () {
	'use strict';

	/**
	 * For standalone demo purposes, this is a fake of the fuller implementation
	 * that we have over in DXP.
	 */

	let subscriber;
	let text = 'Lorem ipsum';

	const WORDS = `
		Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
		eiusmod tempor incididunt ut labore et dolore magna aliqua Ut
		enim ad minim veniam quis nostrud exercitation ullamco laboris
		nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in
		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur Excepteur sint occaecat cupidatat non proident sunt in
		culpa qui officia deserunt mollit anim id est laborum
	`
		.trim()
		.split(/\s+/);

	function getRandomWord() {
		return WORDS[Math.floor(Math.random() * WORDS.length)];
	}

	window.Liferay = {
		Store: {
			get() {
				return {
					store: {
						dispatch(action) {
							// Not even pretending to call a real reducer...
							text = `${text} ${getRandomWord()}`;

							if (subscriber) {
								subscriber();
							}
						},

						getState() {
							return {text};
						},

						subscribe(newSubscriber) {
							subscriber = newSubscriber;

							return () => {
								subscriber = undefined;
							};
						},
					},
				};
			},
		},
	};
})();
