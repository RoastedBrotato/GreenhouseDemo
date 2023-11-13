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


<div class="px-10 m-auto max-w-7xl">


<div class="add-todo">
  <input type="text" class="border" bind:value={newName} />
  <input type="text" class="border" bind:value={newAddress} />

  <button on:click={() => addNewWarehouse()}>Add Warehouse</button>
</div>

{#each warehouses as warehouse}
  <Warehouse {warehouse} {updateWarehouse} {deleteWarehouse} />
{:else}
  <p>No Warehouses found</p>
{/each}
</div>
<svelte:window on:keypress={handleKeyPress} />


<style>
  .add-todo {
    display: flex;
    margin-bottom: 0.5em;
  }

  :global(.switch) {
    color: lightskyblue;
    cursor: pointer;
  }

  :global(.switch:hover) {
    text-decoration: underline;
  }
</style>