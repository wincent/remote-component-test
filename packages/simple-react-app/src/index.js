import React, {useState} from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props) {
		super(props);

		// This illustrates a gotcha with web component attributes; if not
		// provided, `getAttribute` returns `null`, which prevents React's
		// defaultProps mechanism from working.
		//
		// If you care about it, you have to do a manual fallback.
		this.state = {
			userName: props.userName ?? App.defaultProps.userName,
		};
	}

	render() {
		return <Greeter initialName={this.state.userName} />;
	}
}

App.defaultProps = {
	userName: 'Jane Tester',
};

function Greeter({initialName}) {
	const [name, setName] = useState(initialName);

	return (
		<div>
			<label>
				<span>Name:</span>
				<input
					onChange={(event) => setName(event.target.value)}
					type="text"
					value={name}
				/>
			</label>
			<p>Hello, {name}!</p>
		</div>
	);
}

class SimpleReactApp extends HTMLElement {
	constructor() {
		super();

		this.container = document.createElement('div');

		this.attachShadow({mode: 'open'}).appendChild(this.container);
	}

	connectedCallback() {
		const name = this.getAttribute('name');

		ReactDOM.render(<App userName={name} />, this.container);
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
	container.appendChild(document.createElement('simple-react-app'));
}
