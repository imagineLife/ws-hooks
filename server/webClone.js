const express = require('express');
const app = express();
const port = 3011;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('a user connected');
  
  socket.on('disconnect', reason => {
    console.log('user disconnected');
  });

  socket.on('room', data => {
    console.log('room join');
    console.log(data);
    socket.join(data.room);
  });

  socket.on('leave room', data => {
    console.log('leaving room');
    console.log(data);
    socket.leave(data.room)
  });

  socket.on('new message', data => {
    console.log(data.room);
    socket.broadcast
    .to(data.room)
    .emit('receive message', data)
  });
});

server.listen(port);
console.log(`server listening on port ${port}`)