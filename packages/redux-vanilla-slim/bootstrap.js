(function () {
	'use strict';

	/**
	 * Similar to the implementation of `lookupCallback` in simple-react-app.
	 *
	 * Given a descriptor of the form `foo.bar.baz`, looks up
	 * `window.foo.bar.baz`.
	 *
	 * Returns `undefined` if no such property exists.
	 */
	window.lookupDescriptor = (descriptor) => {
		let value;

		if (/^(?:\w+)(?:\.\w+)*$/.test(descriptor)) {
			value = descriptor.split('.').reduce((acc, property) => {
				if (acc && property in acc) {
					return acc[property];
				}
			}, window);
		} else {
			console.warning(
				`Malformed descriptor: ${JSON.stringify(descriptor)}`
			);
		}

		return value;
	};

	const initialState = {
		counter: 0,
		text: 'Fascinating sample text:',
	};

	const WORDS = ['foo', 'bar', 'baz', 'qux'];

	function reducer(state, action) {
		if (action.type === 'append') {
			return {
				...state,
				counter: state.counter + 1,
				text: state.text + ` ${WORDS[state.counter % WORDS.length]}`,
			};
		}

		return state;
	}

	Liferay.State.register('slim', reducer, initialState);
})();
