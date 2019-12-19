<script>
  export let title;
  export let disabled = false;
  export let loading = false;
</script>

<button
  {disabled}
  on:click
  class="button"
  class:disabled
  class:loading
>
  {title}
</button>

<style lang="postcss">
  .button {
    appearance: none;
    min-width: 120px;
    height: 4rem;
    font-size: 2rem;
    padding: 1rem;
    margin: 1rem;
    background-color: var(--color-primary-bg);
    border: none;
    border-radius: 2px;
    color: var(--color-primary);
    cursor: pointer;
    &:hover {
      background-color: var(--color-primary-bg-darker);
    }
  }
  .disabled {
    background-color: var(--color-disabled-bg);
    color: var(--color-disabled);
    cursor: not-allowed;
    &:hover {
      background-color: var(--color-disabled-bg-darker);
    }
  }
  .button.loading {
    color: transparent;
    cursor: wait;
    position: relative;
  }
  .loading::after {
    animation: loading 600ms infinite linear;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    border-bottom-color: #FFFFFFAA;
    border-right-color: #FFFFFF55;
    border-top-color: transparent;
    content: '';
    display: block;
    height: 2rem;
    left: 50%;
    margin-left: -1rem;
    margin-top: -1rem;
    position: absolute;
    top: 50%;
    width: 2rem;
    z-index: 1;
  }
  @keyframes loading { to { transform: rotate(360deg) } }
</style>
