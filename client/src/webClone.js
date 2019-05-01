import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
// import logo from './logo.svg';
import './main.css';

import Messages from './components/Messages'
const io = require('socket.io-client');
const socket = io('http://localhost:3011');

function App2() {

  return (
    <div>
      <header className="App-header">
        
      </header>

      <Room />
    </div>
  );
}

function Room() {
  console.log('ROOM!');
 
  const [inRoom, setInRoom] = useState(false);

   useEffect(() => {

    if(inRoom) {
      console.log('joining room');
      socket.emit('join room', {room: 'test-room'});
    }

    return () => {

      if(inRoom) {
        console.log('leaving room');
        socket.emit('leave room', {
          room: 'test-room'
        })
      }
    }
  });

  const handleInRoom = () => {
    inRoom
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

    <Messages inRoom={inRoom} socket={socket}/>

  </div>
  );
}



export default App2;
ReactDOM.render(<App2 />, document.getElementById("app"));