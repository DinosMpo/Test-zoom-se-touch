// modules
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const clientPath = __dirname + '/../client';
console.log('Serving static from ' + clientPath);
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

// server connection
let clients = 0;

//otan kapoios mpainei sto site
io.on('connection', (sock) => {
	//when a user connects to the server
	clients ++;
	console.log('Someone connected');	
	sock.emit('message', 'Hi you are connected'); // i don't used
	//i don't used it right now i don't have to
	sock.on('message', (text) => {
		// io.emit('message', text);
		// console.log('Sender ' + sock);
		console.log(text);
		// console.log(io);
	});

	//Message to all connected clients
	io.sockets.emit('broadcast', { description: 'Players online: ' + clients });

	sock.on('disconnect', () => {
		clients --;
	    console.log('user disconnected');
		io.sockets.emit('broadcast', { description: 'Players online: ' + clients });
	});
});

server.on('error', (err) => {
	console.error("Server error : " + err);
});

server.listen(8080, () => {
	console.log("Nonogram Multiplayer game started on 8080");
});