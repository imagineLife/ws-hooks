import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
// import logo from './logo.svg';
import './main.css';

import Messages from './components/Messages'
const io = require('socket.io-client');
// let socket = null;

function App2() {
  let [socket, setSocket ] = useState(null)

  console.log('socket')
  console.log(socket)
  
  useEffect(() => {
    setSocket(io('http://localhost:3011'))
    return () => {
      socket = null;
    }
  }, [])
  return (
    <div>
      <header className="App-header"></header>
      <Room socketProp={socket}/>
    </div>
  );
}

function Room({socketProp}) {
  console.log('ROOM!');
 
  const [inRoom, setInRoom] = useState(false);

   useEffect(() => {

    if(inRoom && socketProp !== null) {
      console.log('joining room');
      socketProp.emit('join-room', {room: 'test-room'});
    }

    return () => {

      if(inRoom && socketProp  !== null) {
        console.log('leaving room');
        socketProp.emit('leave-room', {
          room: 'test-room'
        })
      }
    }
  });

  const handleInRoom = () => {
    inRoom && socketProp  !== null
      ? setInRoom(false)
      : setInRoom(true);
  }

 return(
  <div>
    <h1>
      {inRoom && `You Have Entered The Room` }
      {!inRoom && `Outside Room` }
    </h1>

    <button onClick={() => handleInRoom()}>
      {inRoom && `Leave Room` }
      {!inRoom && `Enter Room` }
    </button>

    <Messages inRoom={inRoom} socket={socketProp}/>

  </div>
  );
}



export default App2;
ReactDOM.render(<App2 />, document.getElementById("app"));