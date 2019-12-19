import { writable } from 'svelte/store';

function createColumns() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addColumn: (newColumn) => update((store) => {
      newColumn.id = store.length;
      return [...store, newColumn];
    }),
    deleteColumn: (removeId) => update((store) => {
      return store.filter((col) => col.id !== removeId);
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

export const columnsStore = createColumns();
