<svelte:head>
  <title>Login</title>
</svelte:head>

<script>
  import { goto, stores, prefetch } from '@sapper/app';
  import { Input, Button, Checkbox } from 'fulmo/cmp';
  import { post } from 'helpers/fetch';

  const { session } = stores();
  let login = '';
  let password = '';
  let errorMsg = '';
  $: disabled = !login || !password;
  let loading = false;
  prefetch('/');

  async function tryLogin () {
    loading = true;
    const response = await post('user/login', {
      login,
      password
    });
    loading = false;
    console.log(response);
    if (response.ok) {
      errorMsg = 'Login ok';
      $session.user = response.user;
      goto('/');
    } else {
      errorMsg = response.error;
    }
  }
</script>

<div class="login-form">
  <Input label="Login" bind:value={login} />
  <Input label="Password" type="password" bind:value={password} />
  <Checkbox label="Remember me" checked />
  <Button
    title="Login"
    disabled={disabled || loading}
    on:click={tryLogin}
    {loading}
  />
  {errorMsg}
</div>

<style>
  .login-form {
    width: 300px;
    min-height: 300px;
    display: flex;
    flex-flow: column;
    align-self: center;
    justify-self: center;
  }
</style>
