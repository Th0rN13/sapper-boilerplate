<script>
  import { Button, Checkbox } from 'fulmo/cmp';
  import Logo from 'Logo.svg';

  import AnimPage from 'AnimatePage.svelte';
</script>

<AnimPage>
  <Button title="Main Page" />

  <Checkbox label="Remember me" checked />

  <Checkbox label="Remember me" />
</AnimPage>

<svelte:head>
  <title>Home</title>
</svelte:head>
