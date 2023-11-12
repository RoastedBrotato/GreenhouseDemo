<script>
    export let data;
  </script>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.800);
    }
  </style>

  <ul>
    {#each data.Warehouse as warehouse}
      <li>{warehouse.name}</li>
    {/each}
  </ul>

  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  
