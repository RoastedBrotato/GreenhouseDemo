<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import Items from "$lib/Items.svelte";
    import { onMount } from "svelte";

    let warehouses = [];
    let items = [];
    let newName = "";
    let newCost = "";
    let newShelfLocation = "";
    let newQuantity = "";
    let warehouseLocation = "";

    onMount(async () => {
      await getAllItems();
      await getAllWarehouses();
    });

    const getAllWarehouses = async () => {
    try {
      let { data, error } = await supabase.from("Warehouse").select("*");
      warehouses = data;
    } catch (err) {
      console.log(err);
    }
  };
  
    const getAllItems = async () => {
      try {
        let { data, error } = await supabase.from("Items").select("*");
        items = data;
      } catch (err) {
        console.log(err);
      }
    };

    const addNewItem = async () => {
    try {
      const { data, error } = await supabase
        .from("Items")
        .insert([{ name: newName, cost_per_unit: newCost, shelf_location: newShelfLocation, warehouse_id: warehouseLocation, quantity: newQuantity }]);
      await getAllItems();
      newName = "";
      newCost = "";
      newShelfLocation = "";
      warehouseLocation = "";
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (item) => {
    try {
      const { data, error } = await supabase
        .from("Items")
        .update({ name: item.name, address: item.address, shelf_location: item.shelf_location, warehouse_id: item.warehouse_id, quantity: item.quantity })
        .eq("id", item.id);
      await getAllItems();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteItem = async (item) => {
    try {
      const { data, error } = await supabase
        .from("Items")
        .delete()
        .eq("id", item.id);
      await getAllItems();
    } catch (err) {
      console.log(err);
    }
  };
  </script>
  
  <div class="px-10 m-auto max-w-7xl mt-10">
    <div>
      <h1 class="text-2xl mb-2 font-bold">Items</h1>
    </div>
  
    <div class="mb-3">
      <div class="w-full max-w-xs">
        <h1 class="text-md font-bold">Add New Item</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newName"
            >
              Item Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newName"
              type="text"
              placeholder="Name"
              bind:value={newName}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newCost"
            >
              Item Cost
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newCost"
              type="number"
              placeholder="Cost"
              bind:value={newCost}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newLocation"
            >
              Shelf Location
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newLocation"
              type="text"
              placeholder="Shelf Location"
              bind:value={newShelfLocation}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newQuantity"
            >
              Quantity
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newQuantity"
              type="number"
              placeholder="Shelf Location"
              bind:value={newQuantity}
            />
          </div>


          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="newWarehouseID">
              Warehouse
            </label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newWarehouseID"
              bind:value={warehouseLocation}
            >
              <option value="" disabled>Select a Warehouse</option>
              {#each warehouses as warehouse}
                <option value={warehouse.id}>{warehouse.name}</option>
              {/each}
            </select>
          </div>


          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              on:click={() => addNewItem()}
            >
              Add item
            </button>
          </div>
        </form>
      </div>
    </div>
  
    <h1 class="text-md my-2 font-bold">Items Table</h1>
  
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">Name</th>
                  <th scope="col" class="px-6 py-4">Cost per Unit</th>
                  <th scope="col" class="px-6 py-4">Shelf Location</th>
                  <th scope="col" class="px-6 py-4">Quantity</th>
                  <th scope="col" class="px-6 py-4">Warehouse</th>
                  <th scope="col" class="px-6 py-4">Edit</th>
                  <th scope="col" class="px-6 py-4">Delete</th>
                </tr>
              </thead>
              <tbody>
              {#each items as item}
                <Items {item} {updateItem} {deleteItem} />
              {:else}
                <p>No Items found</p>
              {/each}
              <tbody />
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    :global(.switch) {
      color: lightskyblue;
      cursor: pointer;
    }
  
    :global(.switch:hover) {
      text-decoration: underline;
    }
  </style>
  