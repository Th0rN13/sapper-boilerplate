<svelte:head>
  <title>Register</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { Input, Button } from 'fulmo/cmp';
  import { post } from 'helpers/fetch';
  const { session } = stores();

  let login = '';
  let name = '';
  let email = '';
  let password = '';
  let repeatPassword = '';
  let errorMsg = '';

  $: loginValid = login.length > 2;
  $: emailValid = /.+\@.+\..+/.test(email);
  $: nameValid = name.length > 0;
  $: passwordValid = password.length > 5 && password === repeatPassword;
  $: disabled = !(loginValid && emailValid && nameValid && passwordValid);
  let loading = false;

  async function tryRegister () {
    loading = true;
    console.log(login, name, email, password)
    const response = await post('user/register', {
      login,
      name,
      email,
      password
    });
    if (response.ok) {
      errorMsg = 'Registered';
      $session.user = response.user;
      goto('/');
    } else {
      errorMsg = response.message;
    }
    loading = false;
  }
</script>

<div class="login-form">
  <Input label="Login" bind:value={login} />
  <Input label="Name" bind:value={name} />
  <Input label="Email" bind:value={email} />
  <Input label="Password" type="password" bind:value={password} />
  <Input label="Repeat password" type="password" bind:value={repeatPassword} />
  <Button
    title="Register"
    disabled={disabled || loading}
    on:click={tryRegister}
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
