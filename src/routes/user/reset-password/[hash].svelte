<script context="module">
  export async function preload({ params, query }, session) {
    const res = await this.fetch(`user/reset-password/${params.hash}`, fetchOptions);
    const resultConfirm = await res.json();
    return { resultConfirm };
  }
</script>

<script >
  export let resultConfirm;

</script>

<div>
  {#if resultConfirm.ok}
    Email confirmed
  {:else}
    Error
  {/if}
</div>