<script context="module">
  import { fetchOptions } from 'helpers/fetch';
  export async function preload(page, session) {
    const res = await this.fetch(`user/profile`, fetchOptions);
    const userData = await res.json();
    return { userData };
  }
</script>

<script>
  import Nav from 'components/Nav.svelte';
  import { stores } from '@sapper/app';
  const { session } = stores();

  export let segment;
  export let userData;

  async function updateUser (userId) {
    if (process.browser) {
      const res = await fetch(`user/profile`, fetchOptions);
      userData = await res.json();
    }
  }

  $: userId = $session.user;
  $: updateUser(userId);
</script>

<Nav {segment} {userData} />
<main>
  <slot></slot>
</main>

<style>
  main {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
