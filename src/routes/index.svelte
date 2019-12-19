<svelte:head>
  <title>Home</title>
</svelte:head>

<script>
  import { Button } from 'UI';
  import { Field } from 'Board';
  import { stores } from '@sapper/app';
  const { session } = stores();

const rows = [
    { idx: 1, content: 'current sprint'},
    { idx: 2, content: 'next sprint'},
  ];
</script>

<Field title="Field" rows={rows}>
</Field>

<Button title="New task" on:click={() => console.log('new task')}/>

<style>
</style>
