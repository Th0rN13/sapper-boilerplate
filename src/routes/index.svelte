<svelte:head>
  <title>Home</title>
</svelte:head>

<script>
  import { Button, Checkbox } from 'fulmo/cmp';
  import AnimPage from './_animate-page.svelte';
  import { stores } from '@sapper/app';
  const { session } = stores();

  $: console.log($session);
</script>

<AnimPage>
  <Button title="Main Page" />

  <Checkbox label="Remember me" checked />

  <Checkbox label="Remember me" />
</AnimPage>
