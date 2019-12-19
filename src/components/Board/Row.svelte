<script>
  import Card from './Card.svelte';
  export let title;
  export let columns;
</script>

{title}
{#each columns as column (column.idx)}
  <div>
    {column.content}
  </div>
{/each}

<style>
</style>
