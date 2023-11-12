<script>
    export let data;
  </script>

  <ul>
    {#each data.Warehouse as country}
      <li>{country.name}</li>
    {/each}
  </ul>