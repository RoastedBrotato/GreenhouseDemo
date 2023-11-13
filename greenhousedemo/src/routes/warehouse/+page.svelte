<script>
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabaseClient";
  import Warehouse from "$lib/Warehouse.svelte";
  import { onMount } from "svelte";

  let warehouses = [];
  let newName = "";
  let newAddress = "";

  onMount(async () => {
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

  const addNewWarehouse = async () => {
    try {
      const { data, error } = await supabase
        .from("Warehouse")
        .insert([{ name: newName, address: newAddress }]);
      await getAllWarehouses();
      newName = "";
      newAddress = "";
    } catch (err) {
      console.log(err);
    }
  };

  const updateWarehouse = async (warehouse) => {
    try {
      const { data, error } = await supabase
        .from("Warehouse")
        .update({ name: warehouse.name, address: warehouse.address })
        .eq("id", warehouse.id);
      await getAllWarehouses();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteWarehouse = async (warehouse) => {
    try {
      const { data, error } = await supabase
        .from("Warehouse")
        .delete()
        .eq("id", warehouse.id);
      await getAllWarehouses();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newName !== "") {
      addNewWarehouse();
    }
  };
</script>

<div class="px-10 m-auto max-w-7xl mt-10">
  <div>
    <h1 class="text-2xl mb-2 font-bold">Warehouse</h1>
  </div>

  <div class="add-warehouse mb-3">
    <div class="w-full max-w-xs">
      <h1 class="text-md font-bold">Add New Warehouse</h1>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="newName"
          >
            Warehouse Name
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
            for="newAddress"
          >
            Warehouse Address
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="newAddress"
            type="text"
            placeholder="Address"
            bind:value={newAddress}
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            on:click={() => addNewWarehouse()}
          >
            Add Warehouse
          </button>
        </div>
      </form>
    </div>
  </div>

  <h1 class="text-md my-2 font-bold">Warehouse Table</h1>

  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" class="px-6 py-4">Name</th>
                <th scope="col" class="px-6 py-4">Address</th>
                <th scope="col" class="px-6 py-4">Edit</th>
                <th scope="col" class="px-6 py-4">Delete</th>
              </tr>
            </thead>
            <tbody>
            {#each warehouses as warehouse}
              <Warehouse {warehouse} {updateWarehouse} {deleteWarehouse} />
            {:else}
              <p>No Warehouses found</p>
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
