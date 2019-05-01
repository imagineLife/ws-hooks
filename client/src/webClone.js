import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
// import logo from './logo.svg';
import './main.css';

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

    <Messages inRoom={inRoom} />

  </div>
  );
}

function Messages(props) {

  const [messageCount, setMessageCount] = useState(0);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {

    socket.on('receive message', payload => {
      setMessageCount(messageCount + 1);
    });
  });

  useEffect(() => {
    console.log('received new message');
    document.title = `${messageCount} new messages have been emitted`;
  }, [messageCount]); //only re-run the effect if new message comes in

  const handleSetTheme = () => {
    let newTheme;
    (theme === 'light')
      ? newTheme = 'dark'
      : newTheme = 'light';

    console.log('new theme: ' + newTheme);
    setTheme(newTheme);
  }

  const handleNewMessage = () => {
    console.log('emitting new message');
    socket.emit('new message', {
      room: 'test-room'
    });

    setMessageCount(messageCount + 1);
  }

  return(
    <div className={`App Theme-${theme}`}>

        <p>{messageCount} messages have been emitted</p>

        {props.inRoom &&
        <button onClick={() => handleNewMessage()}>
          Emit new message
        </button>
        }

        <button onClick={() => handleSetTheme()}>
          Toggle Theme
        </button>
    </div>
  );
}

export default App2;
ReactDOM.render(<App2 />, document.getElementById("app"));