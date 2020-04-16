export function startChatServer(ioServer) {
  const chatServer = ioServer.of('/chat');

  let numUsers = 0;

  chatServer.on('connection', function(socket) {
    ++numUsers;
    chatServer.emit('service message', `A new user has joined the chat, now ${numUsers} in chat`);

    socket.on('message', function(msg) {
      chatServer.emit('message', msg);
    })

    socket.on('disconnect', function() {
      --numUsers;
      socket.broadcast.emit('service message', `${numUsers} users in chat.`);
    })

    socket.on('user disconnect', function(name) {
      socket.broadcast.emit('service message', `${name} has left the chat.`)
    })
  });
}
