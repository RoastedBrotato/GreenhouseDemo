<script>
    export let warehouse, updateWarehouse, deleteWarehouse;
</script>

<tr
    class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
>
    <td class="whitespace-nowrap px-6 py-4 font-medium">
        <input
            class="border"
            type="text"
            value={warehouse.name}
            on:input={(e) => {
                warehouse.name = e.currentTarget.value;
            }}
        />
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <input
            class="border"
            type="text"
            value={warehouse.address}
            on:input={(e) => {
                warehouse.address = e.currentTarget.value;
            }}
        />
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" on:click={() => updateWarehouse(warehouse)}>Edit</button>
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" on:click={() => deleteWarehouse(warehouse)}>Delete</button>
    </td>
</tr>

