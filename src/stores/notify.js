import { writable } from 'svelte/store';

// notfication type
// id
// label
// text
// time to remove?
// important

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
    updateColumn: (updateId, newColumn) => update((store) => {
      const idx = store.findIndex((column) => column.id === updateId);
      store[idx] = {
        ...store[idx],
        ...newColumn,
        id: updateId,
      }
      return store;
    }),
  }
}

export const notifyStore = createNotifyStore();
