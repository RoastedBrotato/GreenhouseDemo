<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import InventoryTransactions from "$lib/InventoryTransactions.svelte";
    import { onMount } from "svelte";

    let greenhouses = [];
    let items = [];
    let inventoryTransactions = [];
    let itemName = ""
    let greenhouseLocation = "";
    let newQuantityIssued = "";
    let newDate = "";

    onMount(async () => {
      await getAllItems();
      await getAllGreenhouses();
      await getAllInventoryTransactions();
    });

    const getAllGreenhouses = async () => {
    try {
      let { data, error } = await supabase.from("Greenhouses").select("*");
      greenhouses = data;
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

    const getAllInventoryTransactions = async () => {
      try {
        let { data, error } = await supabase.from("InventoryTransactions").select("*");
        inventoryTransactions = data;
      } catch (err) {
        console.log(err);
      }
    };

    const addNewInventoryTransaction = async () => {
  try {
    // Check if the quantity is enough in the items table
    const { data: itemsData, error: itemsError } = await supabase
      .from("Items")
      .select("quantity")
      .eq("id", itemName);

    if (itemsError) {
      console.error("Error fetching item quantity:", itemsError);
      return;
    }

    const itemQuantityInStock = itemsData[0]?.quantity || 0;
    const itemQuantityInStockNumeric = parseInt(itemQuantityInStock, 10);
    const newQuantityIssuedNumeric = parseInt(newQuantityIssued, 10);

    console.log("Added Quantity", itemQuantityInStockNumeric);
    console.log("New Quantity", newQuantityIssuedNumeric);

    // Check if there is enough quantity in stock
    if (itemQuantityInStockNumeric < newQuantityIssuedNumeric) {
      console.log("Not enough quantity in stock.");
      alert("Not enough quantity");
      return;
    }

    // If there is enough quantity, proceed with the transaction
    const { data: inventoryTransactionData, error: transactionError } = await supabase
      .from("InventoryTransactions")
      .insert([{ item_id: itemName, greenhouse_id: greenhouseLocation, quantity_issued: newQuantityIssued, transaction_date: newDate }]);

    if (transactionError) {
      console.error("Error inserting inventory transaction:", transactionError);
      return;
    }


    // Update the items table with the new quantity
    const updatedQuantityInStock = itemQuantityInStockNumeric - newQuantityIssuedNumeric;
    const { error: updateError } = await supabase
      .from("Items")
      .update({ quantity: updatedQuantityInStock })
      .eq("id", itemName);

    if (updateError) {
      console.error("Error updating item quantity:", updateError);
      return;
    }

    // If everything is successful, refresh the inventory transactions
    await getAllInventoryTransactions();

    // Reset input values
    itemName = "";
    greenhouseLocation = "";
    newQuantityIssued = "";
    newDate = "";
  } catch (err) {
    console.error(err);
    // Handle the error as needed
  }
};

  const updateinventoryTransaction = async (inventoryTransaction) => {
    try {
      const { data, error } = await supabase
        .from("InventoryTransactions")
        .update({ item_id: inventoryTransaction.item_id, greenhouse_id: inventoryTransaction.greenhouse_id, quantity_issued: inventoryTransaction.quantity_issued, transaction_date: inventoryTransaction.transaction_date })
        .eq("id", inventoryTransaction.id);
      await getAllInventoryTransactions();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteinventoryTransaction = async (inventoryTransaction) => {
    try {
      const { data, error } = await supabase
        .from("InventoryTransactions")
        .delete()
        .eq("id", inventoryTransaction.id);
      await getAllInventoryTransactions();
    } catch (err) {
      console.log(err);
    }
  };
  </script>
  
  <div class="px-10 m-auto max-w-7xl mt-10">
    <div>
      <h1 class="text-2xl mb-2 font-bold">Inventory Transcations</h1>
    </div>
  
    <div class="mb-3">
      <div class="w-full max-w-xs">
        <h1 class="text-md font-bold">Add New Transcation</h1>
        <p>Adding Quantity here will deduct from the items table</p>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="newItemId">
                  Item
                </label>
                <select
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="newItemId"
                  bind:value={itemName}
                >
                  <option value="" disabled>Select an Item</option>
                  {#each items as item}
                    <option value={item.id}>{item.name}</option>
                  {/each}
                </select>
              </div>

              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="newGreenhouseID">
                  Greenhouse
                </label>
                <select
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="newGreenhouseID"
                  bind:value={greenhouseLocation}
                >
                  <option value="" disabled>Select the greenhouse</option>
                  {#each greenhouses as greenhouse}
                    <option value={greenhouse.id}>{greenhouse.name}</option>
                  {/each}
                </select>
              </div>
    
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newQuantity"
            >
            Quantity
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newQuantity"
              type="nunmber"
              placeholder="Quantity"
              bind:value={newQuantityIssued}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newDate"
            >
              Date
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newDate"
              type="date"
              placeholder="Date"
              bind:value={newDate}
            />
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              on:click={() => addNewInventoryTransaction()}
            >
              Add transcation
            </button>
          </div>
        </form>
      </div>
    </div>
  
    <h1 class="text-md my-2 font-bold">Transactions Table</h1>
  
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">Item Name</th>
                  <th scope="col" class="px-6 py-4">Greenhouse Name</th>
                  <th scope="col" class="px-6 py-4">Quantity Issued</th>
                  <th scope="col" class="px-6 py-4">Date</th>
                  <th scope="col" class="px-6 py-4">Edit</th>
                  <th scope="col" class="px-6 py-4">Delete</th>
                </tr>
              </thead>
              <tbody>
              {#each inventoryTransactions as inventoryTransaction}
                <InventoryTransactions {inventoryTransaction} {updateinventoryTransaction} {deleteinventoryTransaction} />
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
  