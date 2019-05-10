const express = require('express');
const app = express();
const port = 3011;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let u = require('util')
let debug = u.debuglog('DEBUG')

/*
  Tracker object of rooms && users
*/
let rooms = {}

console.log('// - - **  - - **  - //')


io.on('connection', connectedSocket => {
  console.log('a user connected');
  
  console.log('connectedSocket.id')
  console.log(connectedSocket.id)

  console.log('// - - * - - * - //')
  

  /*
    Disconnect
  */  
  connectedSocket.on('disconnect', reason => {
    debug('- - user disconnected - -');
    //leave node-stored room
    let curUserID = connectedSocket.id
    let hasLeftRoom = false;
    for(let roomName in rooms){
      if(rooms.hasOwnProperty(roomName))
      console.log('roomName loop')
      console.log(roomName)
      rooms[roomName].forEach(personInRoom => {
        console.log('person in THIS room...')
        console.log(personInRoom)
        if(personInRoom == curUserID){
          rooms[roomName] = rooms[roomName].filter(roomUser => roomUser !== curUserID);
          console.log(`REMOVED ${curUserID} user from node-stored ${roomName}`);
        }
      })
    }

    console.log('node-store rooms after disconnecting')
    console.log(rooms)
    debug('// - Disconnect End- - - - //')

  });

  /*
    Join Room
  */
  connectedSocket.on('join-room', data => {
    debug('joining');
    console.log(data);
    // io.sockets.emit('share-users-in-room', usersInRoom)

    //check for room
    let isRoomAlready = rooms && rooms[data.room] ? true : false
    console.log('isRoomAlready')
    console.log(isRoomAlready)
    
    if(!isRoomAlready){
      rooms[data.room] = [];
    }

    rooms[data.room].push(connectedSocket.id)
    console.log('rooms after joining')
    console.log(rooms)
    
    connectedSocket.join(data.room);
    debug('// - jOiN DoNe- - - - //')
    
  });

  /*
    Join Room B 
  */
  connectedSocket.on('join-room-b', data => {
    console.log('joining room B');
    console.log(data);
    // io.sockets.emit('share-users-in-room', usersInRoom)

    //check for room
    let isRoomAlready = rooms && rooms[data.room] ? true : false
    console.log('isRoomAlready')
    console.log(isRoomAlready)
    
    if(!isRoomAlready){
      rooms[data.room] = [];
    }

    rooms[data.room].push(connectedSocket.id)
    console.log('rooms after joining')
    console.log(rooms)
    
    connectedSocket.join(data.room);
    console.log('// - jOiN DoNe- - - - //')
    
  });

  /*
    Leave room
  */
  connectedSocket.on('leave-room', data => {
    debug('// - leaving room Start- - - - //')
    console.log(data);
    // usersInRoom.filter(usr => usr !== connectedSocket.id)
    // io.sockets.emit('share-users-in-room', usersInRoom)
    connectedSocket.leave(data.room)

    let curUserID = connectedSocket.id
    let hasLeftRoom = false;
    for(let roomName in rooms){
      if(rooms.hasOwnProperty(roomName))
      console.log('roomName loop')
      console.log(roomName)
      rooms[roomName].forEach(personInRoom => {
        console.log('person in THIS room...')
        console.log(personInRoom)
        if(personInRoom == curUserID){
          rooms[roomName] = rooms[roomName].filter(roomUser => roomUser !== curUserID);
          console.log(`REMOVED ${curUserID} user from node-stored ${roomName}`);
        }
      })
    }
    console.log('node-store rooms after leaving')
    console.log(rooms)
    debug('// - leaving room End- - - - //')
  });

  /*
    new-message
  */
  connectedSocket.on('new-message', data => {
    debug('// - - new-message recieved - - //')
    console.log(data);
    console.log('connectedSocket.id')
    console.log(connectedSocket.id)
    
    console.log('connectedSocket.rooms')
    console.log(connectedSocket.rooms)
    console.log('Object.keys(io.sockets.adapter.rooms)')
    console.log(Object.keys(io.sockets.adapter.rooms))
    
    connectedSocket.broadcast
    .to(data.room)
    .emit('receive message', data)

    // sending to all clients in 'data.room', including sender
    // io.in(data.room).emit('receive message', data);

    // sending to all clients in 'data.room', including sender
    connectedSocket.to(data.room).emit('recieve message', data);

    debug('// - - new-message end - - //')
    

  });

  connectedSocket.on('join-call-center', data => {
    console.log('JOINED DATA CENTER!')
    console.log(data)
    
  })

  console.log('// - Connection- - - Ended- //')
  
});

server.listen(port);
console.log(`server listening on port ${port}`)