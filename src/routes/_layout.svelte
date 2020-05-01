<script>
	import Nav from 'components/Nav.svelte';
	import NotifyWrapper from 'UI/NotifyWrapper.svelte';
	export let segment;
</script>

<Nav {segment} />
<main>
	<slot />
</main>
<div>
	<NotifyWrapper />
</div>

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
	div {
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>
