var SocketIO = require('socket.io');
var debug = require('debug')('simple-iot-backend:socket');

var socket = {
	init: function (server) {
		debug("SocketServer", "init");

		// This are the available rooms
		var Rooms = ["producer", "consumer", "actuator", "controller"];

		// This is the SocketIO server, allows comunication with WebClients
		this.SocketIOServer = SocketIO.listen(server);

		this.SocketIOServer.sockets.on('connection', onSocketClientConnection);

		var Sockets = this.SocketIOServer.sockets;
		
		function onSocketClientConnection(client) {
			debug('onSocketClientConnection');
			// join the client to a room
			client.on('room', function (room) {
				debug('onSocketClientRoom', room);

				if (Rooms.indexOf(room) >= 0) {
					debug('SocketClientJoinRoom', room);
					client.join(room);
				} else {
					debug('Unknown Room', room);
				}
			});
			// emit messages from producer
			client.on('producer', function (data) {
				Sockets.in('consumer').emit('producer', data);
			});
			// emit messages from controller
			client.on('controller', function (data) {
				Sockets.in('actuator').emit('controller', data);
			});
		}
	}
};

module.exports = socket;