import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client'
// import Title from './components/Title'

const App = ({pText}) => {
	let [socket, setSocket] = useState(null)

	let sendSocketMessage = () => {
		console.log('sending socket message')
	}
	//takes fn && arr
	useEffect(() => {
		//connect socket server
		setSocket(io('localhost:3000'))
		
		//like componetWillUnMount
		return () => {
			socket.on('disconnect', setConnected(false))
		}
	}, [])

	if(socket) {
		console.log('IS socket')
		console.log(socket)
	}
	
  	return (
  		<React.Fragment>
		    <p>Connected: { socket && socket.connected ? 'true' : 'false'}</p>
		    <button className="test-send-message" onClick={sendSocketMessage}>Send Message</button>
		</React.Fragment>    
	  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));