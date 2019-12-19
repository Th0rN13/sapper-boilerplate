<script>
  import { Button } from 'UI';
  import { columnsStore } from 'stores/columns';
  function handleAdd () {
    columnsStore.addColumn({id: 1, title: '', description: ''});
  }
  $: console.log($columnsStore);
</script>

{#each $columnsStore as column (column.id)}
  <div class="edit-row">
    <div class="number">
      {column.id}
    </div>
    <div class="edit-input">
      <label>
        Column title
        <input bind:value={column.title} placeholder="New column" />
      </label>
    </div>
    <div class="edit-input">
      <label>
        Column description
        <input bind:value={column.description} placeholder="Just added column description"/>
      </label>
    </div>
  </div>
{/each}
<Button title="Add new column" on:click={handleAdd}/>

<style>
  .edit-row {
    display: flex;
  }
  .number {

  }
</style>
