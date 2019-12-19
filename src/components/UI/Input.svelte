<script>
  export let value = '';
  export let disabled = false;
  export let label = 'Label';
  export let type = 'text';
  let isFocused = false;
  $: isLabelRaised = value !== '' || isFocused;

  function handleFocus (value) {
    isFocused = value;
  }
</script>

<label
  class="label"
  class:focused={isFocused}
>
  {#if label}
    <div
      class="label-text"
    >
      {label}
    </div>
  {/if}
  {#if type==="password"}
    <input
      class="input"
      bind:value
      type="password"
      {disabled}
      on:focus={() => {handleFocus(true)}}
      on:blur={() => {handleFocus(false)}}
    />
  {:else}
    <input
      class="input"
      bind:value
      type="text"
      {disabled}
      on:focus={() => {handleFocus(true)}}
      on:blur={() => {handleFocus(false)}}
    />
  {/if}
</label>

<style lang="postcss">
  .label {
    margin: 1rem;
  }
  .label-text {
    height: 3rem;
    font-size: 2rem;
  }
  .input {
    height: 4rem;
    display: flex;
    border-radius: 2px;
    border: 1px solid #cccccc;
    padding: 1rem;
    width: 100%;
  }
</style>
