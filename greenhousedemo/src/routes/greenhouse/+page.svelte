<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import Greenhouse from "$lib/Greenhouse.svelte";
    import { onMount } from "svelte";
  
    let greenhouses = [];
    let newName = "";
    let newPlant = "";
    let newLocation ="";
  
    onMount(async () => {
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
  
    const addNewGreenhouse = async () => {
      try {
        const { data, error } = await supabase
          .from("Greenhouses")
          .insert([{ name: newName, type_of_plant: newPlant, location: newLocation }]);
        await getAllGreenhouses();
        newName = "";
        newPlant = "";
        newLocation = ""
      } catch (err) {
        console.log(err);
      }
    };
  
    const updateGreenhouse = async (greenhouses) => {
      try {
        const { data, error } = await supabase
          .from("Greenhouses")
          .update({ name: greenhouses.name, address: greenhouses.address })
          .eq("id", greenhouses.id);
        await getAllGreenhouses();
      } catch (err) {
        console.log(err);
      }
    };
    const deleteGreenhouse = async (greenhouses) => {
      try {
        const { data, error } = await supabase
          .from("Greenhouses")
          .delete()
          .eq("id", greenhouses.id);
        await getAllGreenhouses();
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && newName !== "") {
        addNewGreenhouse();
      }
    };
  </script>
  
  <div class="px-10 m-auto max-w-7xl mt-10">
    <div>
      <h1 class="text-2xl mb-2 font-bold">Greenhouse</h1>
    </div>
  
    <div class="add-greenhouose mb-3">
      <div class="w-full max-w-xs">
        <h1 class="text-md font-bold">Add New Greenhouse</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newName"
            >
              Greenhouse Name
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
              for="newPlant"
            >
              Type of Plant
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newAddress"
              type="text"
              placeholder="Type of Plant"
              bind:value={newPlant}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newLocation"
            >
              Location
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newLocation"
              type="text"
              placeholder="Location"
              bind:value={newLocation}
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              on:click={() => addNewGreenhouse()}
            >
              Add Greenhouse
            </button>
          </div>
        </form>
      </div>
    </div>
  
    <h1 class="text-md my-2 font-bold">Greenhouse Table</h1>
  
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">Name</th>
                  <th scope="col" class="px-6 py-4">Type of plant</th>
                  <th scope="col" class="px-6 py-4">Location</th>
                  <th scope="col" class="px-6 py-4">Edit</th>
                  <th scope="col" class="px-6 py-4">Delete</th>
                </tr>
              </thead>
              <tbody>
              {#each greenhouses as greenhouse}
                <Greenhouse {greenhouse} {updateGreenhouse} {deleteGreenhouse} />
              {:else}
                <p>No Greenhouses found</p>
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
  