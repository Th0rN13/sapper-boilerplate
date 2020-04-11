
<script>
  import NavLink from 'UI/NavLink.svelte';
  import ProfileMenu from 'Menu/Profile.svelte';
  import { stores } from '@sapper/app';
  const { session } = stores();

  export let segment;

  let menuVisible = false;
  $: menuVisible = (segment, false);

  function profileMenuClose() {
    menuVisible = false;
  }

  function profileMenuOpen() {
    menuVisible = true;
  }

  const links = [
    {
      href: '.',
      name: 'Home',
    },
    {
      href: 'chat',
      name: 'Chat',
    },
  ];
</script>

<nav class="nav">
  <ul class="nav__list">
    {#each links as link}
    <li class="nav__item">
      <NavLink
        selected={(segment === link.href) || (!segment && link.href === '.' )}
        href={link.href}
        name={link.name}
      />
      </li>
    {/each}
  </ul>
  <div class="nav__user">
    {#if ($session.user && $session.user.id)}
      <ProfileMenu
        {menuVisible}
        on:close={profileMenuClose}
        on:open={profileMenuOpen}
        userData={$session.user}
      />
    {:else}
      <NavLink
        selected={segment === 'register'}
        href={'register'}
        name="Register"
      />
      <NavLink
        selected={segment === 'login'}
        href={'login'}
        name="Login"
      />
    {/if}
  </div>
</nav>

<style lang="postcss">
  .nav {
    border-bottom: 1px solid rgba(255,62,0,0.1);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__list {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__item {
      margin: 0;
      padding: 0;
      display: block;
    }

    &__user {
      display: flex;
    }
  }
</style>
