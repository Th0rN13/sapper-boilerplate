<script context="module">
	import { fetchOptions } from 'helpers/fetch';
	export async function preload({ params, query }, session) {
		const result = await this.fetch(`user/confirm-email/${params.hash}`, fetchOptions).then(
			(r) => r.json()
		);
		return { result };
	}
</script>

<script>
	export let result;
</script>

<div>
	{#if result.ok}Email confirmed{:else}Error{/if}
</div>
