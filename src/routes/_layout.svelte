<script>
  import Nav from 'components/Nav.svelte';
  export let segment;
</script>

<Nav {segment} />
<main>
  <slot />
</main>

<style lang="postcss">
  main {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
