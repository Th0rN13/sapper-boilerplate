<script>
	import { onDestroy } from 'svelte';
	import { notifyNotElapsedStore, sendSocket, emitNotifyDisconnect } from 'stores/notify';
	import Notification from 'UI/Notification.svelte';

	onDestroy(emitNotifyDisconnect);
</script>

{#if $notifyNotElapsedStore && $notifyNotElapsedStore.length !== 0}
	<div>
		{#each $notifyNotElapsedStore as { text, id } (id)}
			<Notification>{text}</Notification>
		{/each}
	</div>
{/if}

<style>
	div {
		border: 1ps solid gray;
		border-radius: 2px;
		background: #eeeeee;
		padding: 8px;
	}
</style>
