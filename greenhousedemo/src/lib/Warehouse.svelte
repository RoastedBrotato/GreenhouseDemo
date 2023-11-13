<script>
    export let warehouse, updateWarehouse, deleteWarehouse;
  </script>
  
  <div class="warehouses">
    <input
    class="border"
      type="text"
      value={warehouse.name}
      on:input={(e) => {
        warehouse.name = e.currentTarget.value;
      }}
    />

    <input
    class="border"
      type="text"
      value={warehouse.address}
      on:input={(e) => {
        warehouse.address = e.currentTarget.value;
      }}
    />

    <button on:click={() => updateWarehouse(warehouse)}>Edit</button>
    <button on:click={() => deleteWarehouse(warehouse)}>Delete</button>
  </div>
