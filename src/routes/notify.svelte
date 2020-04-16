<svelte:head>
  <title>Notify all</title>
</svelte:head>

<script>
  import { onDestroy } from 'svelte';
  import { stores } from '@sapper/app';
  import { notifyRecentStore, sendSocket, emitNotifyDisconnect  } from 'stores/notify';
  import AnimPage from 'AnimatePage.svelte';
  import { Input, Button } from 'fulmo/cmp';
  const { session } = stores();

  let chatMsg = '';
  $: name = $session.user && $session.user.name || 'Anonymous user';

  onDestroy(emitNotifyDisconnect);

  function sendMsg () {
    if (chatMsg.length > 0) {
      const message = {
        id: Math.random(),
        user: name,
        text: chatMsg,
      };
      sendSocket(message);
      chatMsg = '';
    }
  }
  function clearMsg () {
    chatMsg = '';
  }
</script>

<AnimPage>
  <div class="chat-wrapper">
    <div class="chat">
      {#each $notifyRecentStore as message (message.id)}
        <div class="message">
          <strong>{message.user}:</strong>
          {message.text}
        </div>
      {/each}
    </div>
    <div class="chat-input">
      <Input label="Enter message" bind:value={chatMsg} on:enter={sendMsg} on:escape={clearMsg}/>
      <Button
        title="Send"
        on:click={sendMsg}
      />
    </div>
  </div>
</AnimPage>

<style lang="postcss">
  .chat-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
  }
  .chat {
    flex: 1 1 100%;
    border: 1px solid gray;
    border-radius: 2px;
    box-shadow: 4px 1px 4px 4px rgba(0, 0, 0, 0.1);
    padding: 8px;
    overflow: auto;
  }
  .message {
    padding: 4px;
  }
  .message:nth-child(2n) {
    background: rgba(0, 0, 0, 0.05);
  }
  .chat-input {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 80px;
    & :global(label) {
      flex: 0 1 100%;
    }
    & :global(button) {
      flex: 0 1 20%;
    }
  }
</style>