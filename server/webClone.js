const express = require('express');
const app = express();
const port = 3011;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let users = [];

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
    connectedSocket.join(data.room);
  });

  connectedSocket.on('leave-room', data => {
    console.log('leaving room');
    console.log(data);
    connectedSocket.leave(data.room)
  });

  connectedSocket.on('new-message', data => {
    console.log(data.room);
    connectedSocket.broadcast
    .to(data.room)
    .emit('receive message', data)
  });

  console.log('// - - - - - //')
  
});

server.listen(port);
console.log(`server listening on port ${port}`)