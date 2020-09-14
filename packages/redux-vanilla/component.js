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
	function lookupDescriptor(descriptor) {
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
	}

	class ReduxVanilla extends HTMLElement {
		constructor() {
			super();

			this.button = document.createElement('button');
			this.button.innerText = '...';

			this.prose = document.createElement('div');

			const root = document.createElement('div');

			root.appendChild(this.prose);
			root.appendChild(this.button);

			this.attachShadow({mode: 'open'}).appendChild(root);

			this.append = this.append.bind(this);
		}

		append() {
			this.dispatch({type: 'append'});
		}

		connectedCallback() {
			this.button.addEventListener('click', this.append);

			const descriptor = this.getAttribute('store-descriptor');

			const Store = lookupDescriptor(descriptor);

			const {dispatch, getState, subscribe} = Store.get('default').store;

			this.prose.innerText = getState().text;

			this.dispatch = dispatch;

			this.unsubscribe = subscribe(() => {
				this.prose.innerText = getState().text;
			});
		}

		disconnectedCallback() {
			this.button.removeEventListener('click', this.append);

			this.unsubscribe();
		}
	}

	if (customElements.get('redux-vanilla')) {
		console.log(
			'Skipping registration for <redux-vanilla> (already registered)'
		);
	} else {
		customElements.define('redux-vanilla', ReduxVanilla);
	}
})();
