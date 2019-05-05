const express = require('express');
const app = express();
const port = 3011;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let rooms = {}

io.on('connection', connectedSocket => {
  console.log('a user connected');
  
  console.log('connectedSocket.id')
  console.log(connectedSocket.id)
  
  connectedSocket.on('disconnect', reason => {
    console.log('user disconnected');
  });

  connectedSocket.on('join-room', data => {
    console.log('joining');
    console.log(data);
    // io.sockets.emit('share-users-in-room', usersInRoom)

    //check for room
    let isRoomAlready = rooms && rooms[data.room] ? true : false
    
    rooms[data.room] = [];
    rooms[data.room].push(connectedSocket.id)
    console.log('rooms after joining')
    console.log(rooms)
    
    connectedSocket.join(data.room);
  });

  connectedSocket.on('leave-room', data => {
    console.log('leaving room');
    console.log(data);
    usersInRoom.filter(usr => usr !== connectedSocket.id)
    // io.sockets.emit('share-users-in-room', usersInRoom)
    connectedSocket.leave(data.room)
  });

  connectedSocket.on('new-message', data => {
    console.log('new-message recieved')
    console.log(data);
    console.log('connectedSocket.rooms')
    console.log(connectedSocket.rooms)
    console.log('Object.keys(io.sockets.adapter.rooms)')
    console.log(Object.keys(io.sockets.adapter.rooms))
    
    
    
    connectedSocket.broadcast
    .to(data.room)
    .emit('receive message', data)
  });

  console.log('// - - - - - //')
  
});

server.listen(port);
console.log(`server listening on port ${port}`)