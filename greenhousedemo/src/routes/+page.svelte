<script>

import { onMount } from "svelte";
import { supabase } from "$lib/supabaseClient";


    let harvestAlerts = [];
    let pendingDueDates = 0;


    const getAllHarvestAlerts = async () => {
      try {
        let { data, error } = await supabase.from("HarvestAlerts").select("*");
        harvestAlerts = data;
      } catch (err) {
        console.log(err);
      }
    };

    function updatePendingDueDates() {
    const today = new Date();
    pendingDueDates = harvestAlerts.filter(alert => new Date(alert.alert_date) <= today).length;
  }
  function checkForDueDateNotification() {
    // You can customize this logic based on your notification requirements
    if (pendingDueDates > 0) {
      alert(`You have ${pendingDueDates} pending due dates today!`);
    }
  }

  onMount(async () => {
      await getAllHarvestAlerts();
      await updatePendingDueDates();
      await checkForDueDateNotification();
    });
 
  </script>



  <div class="max-w-2xl mx-auto p-4">
    
  <h1 class="mt-10 text-3xl font-bold">
    Demo Dashboard
  </h1>

  <div class="w-full max-w-xs">
    <h1 class="text-md font-bold">Pending Harvest</h1>
    <p>
        You have {pendingDueDates} pending due dates today!
    </p>
</div>
  
    <h1 class="text-2xl font-bold mb-4">Project Overview</h1>

    <ul class="list-disc pl-6">
      <li class="mb-2">This project leverages the power of Supabase and SvelteKit.</li>
      <li class="mb-2">Supabase, integrated seamlessly with SvelteKit, utilizes its demo database.</li>
      <li class="mb-2">The demo database encompasses essential entities: warehouses, greenhouses, items, inventory, and harvest alerts.</li>
      <li class="mb-2">In the inventory transactions, the specified quantity is intelligently deducted from the items table.</li>
      <li class="mb-2">Harvest alerts promptly notify users when it's time to take action on due dates.</li>
      <li class="mb-2">While the project is currently desktop-friendly, it is not designed to be fully responsive.</li>
      <li class="mb-2">This demo project does not have error handling, and it only demonstrates the ability to use databases, perform CRUD operations, and create functions to handle business requirements</li>
    </ul>
  </div>


<style>
  /* Add additional styling as needed */
  .list-disc li {
    color: #333; /* Set the color of list items */
  }
</style>
