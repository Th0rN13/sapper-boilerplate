<script>
  import Row from './Row.svelte';
  export let title;
  export let rows;
</script>

{title}
{#each rows as row (row.idx)}
  <div>
    {row.content}
  </div>
{/each}

<style>
</style>
