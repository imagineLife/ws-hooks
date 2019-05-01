import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client'
// import Title from './components/Title'

class App extends React.Component{
	constructor(props){
		super(props)
		
		this.state = {
			socket: null
		}

		this.sendSocketMessage = this.sendSocketMessage.bind(this)

	}

	componentDidMount(){
		this.setState({socket: io('localhost:3000')})
	}

	sendSocketMessage(){
		console.log('sending socket message')
	}

	componentWillUnmount(){
		this.state.socket.disconnect()
	}

	render(){			
	  	return (
	  		<React.Fragment>
			    <p>Connected: { this.state.socket && this.state.socket.connected ? 'true' : 'false'}</p>
			    <button className="test-send-message" onClick={this.sendSocketMessage}>Send Message</button>
			</React.Fragment>    
		  );
	}
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));