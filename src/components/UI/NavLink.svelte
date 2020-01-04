<script>
  export let selected;
  export let href;
  export let name;
</script>

<a rel="prefetch" class='{selected ? "selected" : ""}' href='{href}'>{name}</a>

<style>
  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 2rem);
    height: 2px;
    background-color: rgb(255,62,0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1rem 1rem;
    display: block;
    border-radius: 2px;
  }

  a:hover {
    background-color: #00000020;
    box-shadow: 0 0 2px 2px #00000020;
  }
</style>
