import React, {useState} from 'react';
import ReactDOM from 'react-dom';

/**
 * We're defining this locally here, but could also set it up as a well-known
 * global so that any web component could use it.
 */
function lookupCallback(descriptor) {
	let callback;

	if (typeof descriptor === 'string') {
		if (/^(?:\w+)(?:\.\w+)*$/.test(descriptor)) {
			callback = descriptor.split('.').reduce((acc, property) => {
				if (acc && property in acc) {
					return acc[property];
				}
			}, window);
		} else {
			console.warning(
				`Malformed descriptor: ${JSON.stringify(descriptor)}`
			);
		}
	}

	return typeof callback === 'function' ? callback : () => {};
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// This illustrates a gotcha with web component attributes; if not
			// provided, `getAttribute` returns `null`, which prevents React's
			// defaultProps mechanism from working.
			//
			// If you care about it, you have to do a manual fallback.
			userName: props.userName ?? App.defaultProps.userName,
		};
	}

	componentDidUpdate(_prevProps, prevState) {
		if (this.props.onChange && this.state.userName !== prevState.userName) {
			this.props.onChange({userName: this.state.userName});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.userName && nextProps.userName !== this.state.userName) {
			this.setState({userName: nextProps.userName});
		}
	}

	render() {
		return (
			<Greeter
				onNameChange={(userName) => this.setState({userName})}
				name={this.state.userName}
			/>
		);
	}
}

App.defaultProps = {
	userName: 'Jane Tester',
};

function Greeter({name, onNameChange}) {
	return (
		<div>
			<label>
				<span>Name:</span>
				<input
					onChange={(event) => onNameChange(event.target.value)}
					type="text"
					value={name}
				/>
			</label>
			<p>Hello, {name}!</p>
		</div>
	);
}

class SimpleReactApp extends HTMLElement {
	static get observedAttributes() {
		return ['name'];
	}

	constructor() {
		super();

		this.container = document.createElement('div');

		this.attachShadow({mode: 'open'}).appendChild(this.container);
	}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (attributeName === 'name') {
			// Trigger a whole-app re-render, just to show that we can.
			//
			// As noted here, this is ok for small apps:
			// https://stackoverflow.com/a/35675972/2103996
			this.connectedCallback();
		}
	}

	connectedCallback() {
		const name = this.getAttribute('name');

		const onChange =
			this.onChange ??
			lookupCallback(this.getAttribute('onChangeDescriptor'));

		ReactDOM.render(
			<App onChange={onChange} userName={name} />,
			this.container
		);
	}

	disconnectedCallback() {
		ReactDOM.unmountComponentAtNode(this.container);
	}
}

if (customElements.get('simple-react-app')) {
	console.log(
		'Skipping registration for <simple-react-app> (already registered)'
	);
} else {
	customElements.define('simple-react-app', SimpleReactApp);
}

const container = document.getElementById('simple-react-app-standalone-root');

if (container) {
	// We're probably being rendered at:
	//
	// http://remote-component-test.wincent.com/packages/simple-react-app/index.html

	const component = document.createElement('simple-react-app');

	container.appendChild(component);

	// Not really relevant to the initial proof-of-concept in DXP, but you can set
	// this to `true` in the standalone demo to show bidirectional flow between the
	// React web app inside the web component and the outside world.
	//
	// This adds a button that shows that you can:
	//
	// - `setAttribute` on the web component and have that data show up in the React
	//   app; and:
	// - `setAttribute` on the web component to register a callback, which the React
	//   app can the use to communicate information back to the outside world.
	if (demoBidirectionalDataFlow) {
		// Demo how we can register a global callback to be notified of changes.

		window.__SimpleReactApp__ = {
			onChange({userName}) {
				console.log(`New name is ${userName} (via descriptor)`);
			},
		};

		component.setAttribute('onChangeDescriptor', '__SimpleReactApp__.onChange');

		// Show that we can also pass function objects directly.
		// (Remove or invert the `if (false)` conditional to see this in action.)

		if (false) {
			component.onChange = ({userName}) => {
				console.log(`New name is ${userName} (via property)`);
			};
		}

		// Make a silly button for our attribute-change demo (see
		// `attributeChangedCallback`):

		const FIRST_NAMES = ['Brian', 'Chema', 'Esther', 'Greg', 'Iván', 'Ray'];

		const INITIALS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

		const LAST_NAMES = [
			'Einstein',
			'Kaepernick',
			'Houston',
			'Napoleon',
			'Fitzgerald',
			'Franco',
		];

		const randomize = document.createElement('button');

		randomize.innerText = 'Randomize!';

		randomize.onclick = randomize.onsubmit = () => {
			component.setAttribute(
				'name',
				`${pick(FIRST_NAMES)} ${pick(INITIALS)} ${pick(LAST_NAMES)}`
			);
		};

		container.appendChild(randomize);

		function pick(array) {
			return array[Math.floor(Math.random() * array.length)];
		}
	}
}
