<script>
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";


    export let item, updateItem, deleteItem;

    const getWarehouseName = async (item) => {
    const { data: Items, error } = await supabase
    .from('Items')
    .select('name, Warehouse(*)')
    .eq('id', item.id)
    return Items?.[0]?.Warehouse?.name || null;
    }


    let warehouseName = '';

  onMount(async () => {
    // Fetch and set the initial warehouse name
    warehouseName = await getWarehouseName(item);
  });


</script>

<tr
    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
>
    <td class="whitespace-nowrap px-6 py-4 font-medium">
        <input
            class="border"
            type="text"
            value={item.name}
            on:input={(e) => {
                item.name = e.currentTarget.value;
            }}
        />
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <input
            class="border"
            type="text"
            value={item.cost_per_unit}
            on:input={(e) => {
                item.cost_per_unit = e.currentTarget.value;
            }}
        />
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <input
            class="border"
            type="text"
            value={item.shelf_location}
            on:input={(e) => {
                item.shelf_location = e.currentTarget.value;
            }}
        />
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <input
            class="border"
            type="text"
            value={item.quantity}
            on:input={(e) => {
                item.quantity = e.currentTarget.value;
            }}
        />
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <p>{warehouseName}</p>
    </td>

    <td class="whitespace-nowrap px-6 py-4">
        <button
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            on:click={() => updateItem(item)}>Edit</button
        >
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <button
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            on:click={() => deleteItem(item)}>Delete</button
        >
    </td>
</tr>
