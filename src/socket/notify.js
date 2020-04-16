export function startNotifyServer(ioServer) {
  const notifyServer = ioServer.of('/notify');

  notifyServer.on('connection', function(socket) {
    notifyServer.emit('service message', `User connected`);

    socket.on('message', function(msg) {
      notifyServer.emit('message', msg);
    })

    socket.on('user disconnect', function() {
      socket.broadcast.emit('service message', `User left`)
    })
  });
}
