import io from 'socket.io-client';
import { chatStore } from 'stores/chat';
const socket = io();

socket.on('message', function(message) {
  chatStore.addMessage(message);
});

export function sendSocket (message) {
  socket.emit('message', message);
  chatStore.addMessage(message);
}
