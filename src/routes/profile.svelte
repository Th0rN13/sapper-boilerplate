<svelte:head>
  <title>Profile</title>
</svelte:head>

<script>
  import { userProfile } from 'stores/user.js';
  import { Input } from 'fulmo/cmp';

  let {login, email} = $userProfile;

</script>

<Input label="Login" bind:value={login} />
<Input label="Email" bind:value={email} />
