import React, {useState} from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	render() {
		return <Greeter />;
	}
}

function Greeter() {
	const [name, setName] = useState('Jane Tester');

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

ReactDOM.render(<App />, document.getElementById('root'));
