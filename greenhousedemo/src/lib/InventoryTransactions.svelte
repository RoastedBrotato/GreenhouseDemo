<script>
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";


    export let inventoryTransaction, updateinventoryTransaction, deleteinventoryTransaction;

    const getGreenhouseName = async (inventoryTransaction) => {
  const { data: InventoryTransactions, error } = await supabase
    .from('InventoryTransactions')
    .select('*, Greenhouses(*)')
    .eq('id', inventoryTransaction.id);

  if (error) {
    console.error('Error fetching greenhouse name:', error);
    return null;
  }

  return InventoryTransactions?.[0]?.Greenhouses?.name || null;
};

    let greenhouseName = '';

    const getItemName = async (inventoryTransaction) => {
  const { data: InventoryTransactions, error } = await supabase
    .from('InventoryTransactions')
    .select('*, Items(*)')
    .eq('id', inventoryTransaction.id);

  if (error) {
    console.error('Error fetching greenhouse name:', error);
    return null;
  }

  return InventoryTransactions?.[0]?.Items?.name || null;
};

    let itemName = '';


  onMount(async () => {
    // Fetch and set the initial warehouse name
    greenhouseName = await getGreenhouseName(inventoryTransaction);
    itemName = await getItemName(inventoryTransaction);
  });

</script>

<tr
    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
>

<td class="whitespace-nowrap px-6 py-4">
    <p>{itemName}</p>
</td>
<td class="whitespace-nowrap px-6 py-4">
    <p>{greenhouseName}</p>
</td>
    <td class="whitespace-nowrap px-6 py-4 font-medium">
        <input
            class="border"
            type="text"
            value={inventoryTransaction.quantity_issued}
            on:input={(e) => {
                inventoryTransaction.quantity_issued = e.currentTarget.value;
            }}
        />
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <input
            class="border"
            type="text"
            value={inventoryTransaction.transaction_date}
            on:input={(e) => {
                inventoryTransaction.transaction_date = e.currentTarget.value;
            }}
        />
    </td>
   
    
  

    <td class="whitespace-nowrap px-6 py-4">
        <button
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            on:click={() => updateinventoryTransaction(inventoryTransaction)}>Edit</button
        >
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <button
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            on:click={() => deleteinventoryTransaction(inventoryTransaction)}>Delete</button
        >
    </td>
</tr>
