<svelte:head>
  <title>Recover password</title>
</svelte:head>

<script>
  import { goto, stores, prefetch } from '@sapper/app';
  import { Input, Button, Checkbox } from 'fulmo/cmp';
  import { post } from 'helpers/fetch';

  const { session } = stores();
  let login = '';
  let errorMsg = '';
  $: disabled = !login;
  let loading = false;

  async function resetPassword () {
    prefetch('/');
    loading = true;
    const response = await post('user/reset-password/create-hash', {
      login,
    });
    loading = false;
    if (response.ok) {
      errorMsg = 'Check your email to reset password';
    } else {
      errorMsg = response.error;
    }
  }
</script>

<div class="login-form">
  <Input label="Login" bind:value={login} />
  <Button
    title="Login"
    disabled={disabled || loading}
    on:click={resetPassword}
    {loading}
  />
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
