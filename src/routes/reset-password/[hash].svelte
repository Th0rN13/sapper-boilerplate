<script context="module">
  import { fetchOptions } from 'helpers/fetch';
  export async function preload({ params }) {
    const { hash } = params;
    return { hash };
  }
</script>

<script>
  import { goto, stores } from '@sapper/app';
  import { Input, Button, Checkbox } from 'fulmo/cmp';
  import { post } from 'helpers/fetch';
  export let hash;
  let password;
  let loading = false;
  let errorMsg = '';

  async function handleRequest () {
    loading = true;
    const response = await post('user/reset-password', { hash, newPassword: password });
    loading = false;
    if (response.ok) {
      errorMsg = 'Now you can login with new password';
      setTimeout(() => {
        goto('login');
      }, 1000);
    } else {
      errorMsg = response.error;
    }
  }
</script>

<div class="set-password-form">
  <Input label="New password" bind:value={password} />
  <Button
    title="Set new password"
    disabled={loading}
    on:click={handleRequest}
    {loading}
  />
  {errorMsg}
</div>

<style>
  .set-password-form {
    width: 300px;
    min-height: 300px;
    display: flex;
    flex-flow: column;
    align-self: center;
    justify-self: center;
  }
</style>
