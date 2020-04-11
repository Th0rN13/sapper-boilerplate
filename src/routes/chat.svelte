<svelte:head>
  <title>Chat</title>
</svelte:head>

<script>
  import { stores } from '@sapper/app';
  import AnimPage from 'AnimatePage.svelte';
  import { Input, Button } from 'fulmo/cmp';
  const { session } = stores();

  let messages = [
    { id: 0, user: 'admin', text: 'ban for all'},
    { id: 1, user: 'weak user', text: 'Nooooooo!!!'},
    { id: 2, user: 'admin', text: 'Ban weak user'},
    { id: 3, user: 'other user', text: 'Ho-ho-ho!'},
  ];

  let chatMsg = '';

  function sendMsg () {
    console.log(`Msg sent (${$session.user.name}): ${chatMsg}`);
    messages = [...messages, { id: messages.length, user: $session.user.name, text: chatMsg }];
    chatMsg = '';
  }
  function clearMsg () {
    chatMsg = '';
  }
</script>

<AnimPage>
  <div class="chat-wrapper">
    <div class="chat">
      {#each messages as message (message.id)}
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