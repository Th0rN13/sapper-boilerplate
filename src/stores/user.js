import { writable } from 'svelte/store';
import { fetchOptions } from 'helpers/fetch';

function createUserProfile() {
  const { subscribe, set } = writable({});

  return {
    subscribe,
    update: async () => {
      if (process.browser) {
        const res = await fetch(`user/profile`, fetchOptions);
        const userData = await res.json();
        set(userData);
      }
    },
    set: set,
  }
}

export const userProfile = createUserProfile();
