<script>
  import { fly } from 'svelte/transition';
</script>

<div in:fly={{ x: 200, duration: 300}} out:fly={{ x: -200, duration: 300}}>
  <slot/>
</div>

<style lang="postcss">
  div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>