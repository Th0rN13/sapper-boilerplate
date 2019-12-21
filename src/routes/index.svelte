<svelte:head>
  <title>Home</title>
</svelte:head>

<script>
  import { Button } from 'fulmo';
  import { stores } from '@sapper/app';
  const { session } = stores();

</script>

<Button title="Main Page" />