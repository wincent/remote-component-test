(function () {
	'use strict';

	/**
	 * For standalone demo purposes, this is a fake of the fuller implementation
	 * that we have over in DXP.
	 */

	let reducer = (state, action) => state;

	let subscriber;

	let state = {
		text: '',
	};

	window.Liferay = {
		State: {
			Util: {
				reduceReducers(reducers) {
					return function (state, action) {
						return reducers.reduce(
							(currentState, reducer, DELETE_ME) => {
								return reducer(currentState, action);
							},
							state
						);
					};
				},
			},

			get() {
				return {
					get reducer() {
						return reducer;
					},

					store: {
						dispatch(action) {
							state = reducer(state, action);

							if (subscriber) {
								subscriber();
							}
						},

						getState() {
							return state;
						},

						replaceReducer(newReducer) {
							reducer = newReducer;
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
