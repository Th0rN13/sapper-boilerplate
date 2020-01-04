<script context="module">
  import { fetchOptions } from 'helpers/fetch';
  import { userProfile } from 'stores/user.js';
  export async function preload(page, session) {
    const res = await this.fetch(`user/profile`, fetchOptions);
    const userData = await res.json();
    return { userData };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Nav from 'components/Nav.svelte';
  const { session } = stores();

  export let segment;
  export let userData;
  userProfile.set(userData);

  $: userProfile.update($session.user);
</script>

<Nav {segment} />
<main>
  <slot/>
</main>

<style lang="postcss">
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
