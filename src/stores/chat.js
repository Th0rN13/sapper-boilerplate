import { readable } from 'svelte/store';
import io from 'socket.io-client';

let chat;
const MAX_MESSAGES = 30;

export const chatStore = readable([], function (set) {
  let messages = [];
  chat = io('/chat')
  chat.on('message', function(message) {
    messages.push(message);
    if (messages.length > MAX_MESSAGES) messages.shift();
    set(messages);
  });
  chat.on('service message', function(text) {
    messages.push({
      id: Math.random(),
      user: 'Server message',
      text,
    });
    if (messages.length > MAX_MESSAGES) messages.shift();
    set(messages);
  });
  return () => {
    chat.emit('user disconnect', '%username%');
    chat.disconnect();
  };
});

export function sendSocket (message) {
  chat.send(message);
}
