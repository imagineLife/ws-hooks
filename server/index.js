const express = require('express');
const app = express();
const path = require('path')

//middlewares
//serve static files via public folder
app.use(express.static('./dist'));

//start app
var httpServer = app.listen(3000)

//create a socket server
var io = require('socket.io').listen(httpServer)

//Client-Connection
io.sockets.on('connection', (connectedSocket) => {
	console.log('CONNECTION event')

	//when socket DISconnects
	//once happens ONCE, not like an 'on'
	connectedSocket.once('disconnect', () => {
		connectedSocket.disconnect();
		console.log(`socket disconnected`)
	})
})

app.get('/*', function(req, res) {
  res.send('michCheck!')
  // res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
  //   if (err) {
  //     res.status(500).send(err)
  //   }
  // })
})

console.log('server running!')