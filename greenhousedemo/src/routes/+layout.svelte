<script>
    import "../app.css";
    import Sidebar from "$lib/SideNavbar.svelte"
  </script>
  <div class="flex h-screen">
    <!-- Include the sidebar -->
    <Sidebar />
  
  <div class="container mx-auto">
    <slot />
  </div>
</div>