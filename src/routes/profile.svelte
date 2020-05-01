<script>
	import { Input } from 'fulmo/cmp';
	import AnimPage from 'AnimatePage.svelte';
	import { stores } from '@sapper/app';
	const { session } = stores();

	let { login, email } = $session.user;
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>
<AnimPage>
	<Input label="Login" bind:value={login} />
	<Input label="Email" bind:value={email} />
</AnimPage>
