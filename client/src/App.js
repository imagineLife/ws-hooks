import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
// import io from 'socket.io-client'

const io = require('socket.io-client');
let socket = io('http://localhost:3000');

const App = ({pText}) => {

	const [connections, setConnections] = useState(0)

	console.log('%c APP!', 'background-color: black;color: white;')
	console.log('connections')
	console.log(connections)
	// console.log('// - - - - - //')

	const sendSocketMessage = () => {
		console.log('sending socket message')
	}

	useEffect(() => {
		console.log('-- on connections CHANGE --');
		socket.on('passConnections', (connections) => {
			console.log('%c passConnections setting...', 'background-color: green; color:white;')
			console.log('connections')
			console.log(connections)
			
			setConnections(connections)
		});
		return () => {
			//like componetWillUnMount
			console.log('DISCONNECTING');
			socket.disconnect()
		};
	}, [connections])
	
	console.log('connections')
	console.log(connections)
	// console.log('socket')
	// console.log(socket)
	console.log('// - - - - - //')
	
  	return (
  		<Fragment>
  			<p>Connections: {connections.length} </p>
		    <p>Connected: {socket ? 'true' : 'false'}</p>
		    <button className="test-send-message" onClick={sendSocketMessage}>Send Message</button>
		</Fragment>    
	  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));