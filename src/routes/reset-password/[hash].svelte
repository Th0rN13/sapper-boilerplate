<script context="module">
  import { fetchOptions } from 'helpers/fetch';
  export async function preload({ params, query }, session) {
    const { hash } = params.hash;
    const res = await this.fetch(`reset-password`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({ hash }),
    });
    const resultConfirm = await res.json();
    return { resultConfirm, hash };
  }
</script>

<script >
  export let resultConfirm;
  export let hash;

</script>

<div>
  {hash}
  <br>
  {JSON.stringify(resultConfirm)}
</div>
