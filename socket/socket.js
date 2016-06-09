var SocketIO = require('socket.io');
var debug = require('debug')('simple-iot-backend:socket');

var socket = {
	init: function (server) {
		debug("SocketServer", "init");
		
		// This is the SocketIO server, allows comunication with WebClients
		this.SocketIOServer = SocketIO.listen(server);

		this.SocketIOServer.sockets.on('connection', onSocketClientConnection);

		function onSocketClientConnection(client) {
			debug('onSocketClientConnection');
		}
	}
}

module.exports = socket;