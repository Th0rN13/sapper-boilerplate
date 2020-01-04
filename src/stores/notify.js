import { writable } from 'svelte/store';

// notification type\color (succers\error\info)
// id
// label
// text
// time to remove?
// important (remove only by click)

function createNotifyStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addNote: (newNote) => update((store) => {
      return [...store, newNote];
    }),
    deleteNote: (removeId) => update((store) => {
      return store.filter((note) => note.id !== removeId);
    }),
  }
}

export const notifyStore = createNotifyStore();
