import { writable  } from 'svelte/store';

function createChatStore () {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addMessage: (message) => update(chat => {
      let newChat = [...chat, message];
      if (newChat.length > 10) newChat.shift();
      return newChat;
    }),
  };
}

export const chatStore = createChatStore();
