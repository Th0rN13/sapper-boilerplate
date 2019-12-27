import { writable } from 'svelte/store';
import { fetchOptions } from 'helpers/fetch';

function createUserProfile() {
  const { subscribe, set } = writable({});

  return {
    subscribe, set,
    update: async () => {
      if (process.browser) {
        const res = await fetch(`user/profile`, fetchOptions);
        const userData = await res.json();
        set(userData);
      }
    },
  }
}

export const userProfile = createUserProfile();
