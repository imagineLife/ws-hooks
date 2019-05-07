import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import ReactDOM from "react-dom";
import Room from './components/Room'
import './main.css';
const io = require('socket.io-client');

function App2() {
  console.log('%c APP RENDER', 'background-color: steelblue; color: white;')
  
  let [socket, setSocket ] = useState(null)
  

  useEffect(() => {
    setSocket(io('http://localhost:3011'));
    return () => {
      console.log('DISCONNECTING');
      socket.disconnect();
    }
  }, [])

  useEffect(() => {
    if(socket !== null){
      socket.on('share-users-in-room', (roomUsers) => {
        console.log('roomUsers')
        console.log(roomUsers)
      })

      socket.on('disconnect', (reason) => {
        console.log('disconnect reason')
        console.log(reason)
        console.log('// - - - - - //')
      })
    }
  })

  //Cmp-will-UnMount
  return (
    <div>
      <header className="App-header"></header>
      <Router>
        <Switch>
          <Route exat path="/callCenter" render={() => <Room socketProp={socket}/>} />
          <Route exact path="/" render={() => <Room socketProp={socket}/> }/>
          <Redirect from="/*" to="/" />
          <Route render={() =>  <Room socketProp={socket} /> } />
        </Switch>
      </Router>
    </div>
  );
}


export default App2;
ReactDOM.render(<App2 />, document.getElementById("app"));