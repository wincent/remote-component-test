import React, {useState} from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	render() {
		return <Greeter initialName={this.props.userName} />;
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

const container = document.getElementById('simple-react-app-standalone-root');

if (container) {
	// We're probably being rendered at:
	//
	// http://remote-component-test.wincent.com/packages/simple-react-app/index.html
	ReactDOM.render(<App />, container);
} else {
	// We're probably going to be rendered as a web component.
	class SimpleReactApp extends HTMLElement {
		constructor() {
			super();

			this.container = document.createElement('div');
		}

		connectedCallback() {
			this.attachShadow({mode: 'open'}).appendChild(this.container);

			const name = this.getAttribute('name');

			ReactDOM.render(<App userName={name} />, this.container);
		}

		disconnectedCallback() {
			ReactDOM.unmountComponentAtNode(this.container);
		}
	}

	customElements.define('simple-react-app', SimpleReactApp);
}
