<script>
  import { goto, stores } from '@sapper/app';
  import { post } from 'helpers/fetch';

  const { session } = stores();
  let menuVisible = false;
  export let userData;
  let avatarLoaded = false;

  async function logout () {
    const response = await post('user/logout');
    $session.user = undefined;
    goto('login');
  }

  function toggleMenu() {
    menuVisible = !menuVisible;
  }

  function loadAvatar(node, data) {
    const img = new Image();
    img.src = data.src;
    img.onload = () => {
      node.setAttribute('src', data.src);
      avatarLoaded = true;
    };
  }
</script>

<button class="profile-button" on:click={toggleMenu}>
  <div class="profile-name" class:profile-name-hidden={avatarLoaded}>
    {userData.name.slice(0,1)}
  </div>
  {#if (userData.avatar)}
    <img
      src="none"
      alt="avatar"
      class="profile-avatar"
      class:profile-avatar-hidden={!avatarLoaded}
      use:loadAvatar={{ src: userData.avatar}}
    >
  {/if}
</button>
{#if (menuVisible)}
  <div class="backdrop" on:click={toggleMenu}></div>
  <div class="profile-menu">
    {userData.name}
    <button on:click={logout}>Logout</button>
  </div>
{/if}

<style>
  .profile-menu {
    position: absolute;
    display: flex;
    flex-flow: column;
    background: var(--color-primary);
    border: none;
    border-radius: 2px;
    box-shadow: 0 0 2px 2px #00000020;
    min-width: 30rem;
    padding: 1rem;
    top: 5rem;
    right: 2rem;
    z-index: 110;
  }
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000040;
    z-index: 100;
  }
  .profile-button {
    appearance: none;
    border: none;
    border-radius: 2px;
    background: none;
    height: 5rem;
    width: 5rem;
    padding: 0.5rem;
    &:hover {
      box-shadow: 0 0 2px 2px #00000040;
    }
  }
  .profile-name-hidden {
    display: none;
  }
  .profile-avatar {
    width: 100%;
    height: 100%;
    &-hidden {
      display: none;
    }
  }
</style>