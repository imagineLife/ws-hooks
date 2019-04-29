import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client'
// import Title from './components/Title'

const App = ({pText}) => {
	let [socket, setSocket] = useState(null)
	let [connected, setConnected] = useState(false)

	//takes fn && arr
	useEffect(() => {
		//connect socket server
		setSocket(io('http://localhost:3000'))
		setConnected(true)
		
		//like componetWillUnMount
		return () => {
			socket.on('disconnect', setConnected(false))
		}
	}, [])

  	return (
	    <p>Connected: {connected == true ? 'true' : 'false'}</p>
	  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));