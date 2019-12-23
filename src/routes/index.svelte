<svelte:head>
  <title>Home</title>
</svelte:head>

<script>
  import { Button, Checkbox } from 'fulmo/cmp';
  import { stores } from '@sapper/app';
  const { session } = stores();

</script>

<Button title="Main Page" />

<Checkbox label="Remember me" checked />

<Checkbox label="Remember me" />
