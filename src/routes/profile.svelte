<svelte:head>
  <title>Profile</title>
</svelte:head>

<script>
  import { userProfile } from 'stores/user.js';
  import { Input } from 'fulmo/cmp';
  import AnimPage from './_animate-page.svelte';

  let {login, email} = $userProfile;

</script>

<AnimPage>
  <Input label="Login" bind:value={login} />
  <Input label="Email" bind:value={email} />
</AnimPage>
