<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";
    import HarvestAlert from "$lib/HarvestAlert.svelte";

    let greenhouses = [];
    let harvestAlerts = [];
    let newDate = "";
    let newTypeofPlant = "";
    let greenhouseLocation = "";

    onMount(async () => {
      await getAllHarvestAlerts();
      await getAllGreenhouses();
    });

    const getAllGreenhouses = async () => {
    try {
      let { data, error } = await supabase.from("Greenhouses").select("*");
      greenhouses = data;
    } catch (err) {
      console.log(err);
    }
  };
  
    const getAllHarvestAlerts = async () => {
      try {
        let { data, error } = await supabase.from("HarvestAlerts").select("*");
        harvestAlerts = data;
      } catch (err) {
        console.log(err);
      }
    };

    const addNewHarvestAlert = async () => {
    try {
      const { data, error } = await supabase
        .from("HarvestAlerts")
        .insert([{ alert_date: newDate, plants_to_harvest: newTypeofPlant, greenhouse_id: greenhouseLocation}]);
      await getAllHarvestAlerts();
      newDate = "";
      newTypeofPlant = "";
      greenhouseLocation = "";
    } catch (err) {
      console.log(err);
    }
  };

  const updateharvestAlert = async (harvestAlert) => {
    try {
      const { data, error } = await supabase
        .from("HarvestAlerts")
        .update({ alert_date: harvestAlert.alert_date, plants_to_harvest: harvestAlert.plants_to_harvest, greenhouse_id: harvestAlert.greenhouse_id })
        .eq("id", harvestAlert.id);
      await getAllHarvestAlerts();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteharvestAlert = async (harvestAlert) => {
    try {
      const { data, error } = await supabase
        .from("HarvestAlerts")
        .delete()
        .eq("id", harvestAlert.id);
      await getAllHarvestAlerts();
    } catch (err) {
      console.log(err);
    }
  };
  </script>
  
  <div class="px-10 m-auto max-w-7xl mt-10">
    <div>
      <h1 class="text-2xl mb-2 font-bold">Harvest Alerts</h1>
    </div>
  
    <div class="mb-3">
      <div class="w-full max-w-xs">
        <h1 class="text-md font-bold">Add New Alert</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newDate"
            >
              Date
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newDate"
              type="Date"
              placeholder="Date"
              bind:value={newDate}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newTypeofPlant"
            >
              Type of Plant
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newTypeofPlant"
              type="text"
              placeholder="Type"
              bind:value={newTypeofPlant}
            />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="newWarehouseID">
              Greenhouse
            </label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newWarehouseID"
              bind:value={greenhouseLocation}
            >
              <option value="" disabled>Select a Greenhouse</option>
              {#each greenhouses as greenhouse}
                <option value={greenhouse.id}>{greenhouse.name}</option>
              {/each}
            </select>
          </div>


          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              on:click={() => addNewHarvestAlert()}
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
                  <th scope="col" class="px-6 py-4">Date</th>
                  <th scope="col" class="px-6 py-4">Type of Plant</th>
                  <th scope="col" class="px-6 py-4">Greenhouse</th>
                  <th scope="col" class="px-6 py-4">Edit</th>
                  <th scope="col" class="px-6 py-4">Delete</th>
                </tr>
              </thead>
              <tbody>
              {#each harvestAlerts as harvestAlert}
                <HarvestAlert {harvestAlert} {updateharvestAlert} {deleteharvestAlert} />
              {:else}
                <p>No Alerts found</p>
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
  