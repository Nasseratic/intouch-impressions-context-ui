<script>
  import { Link } from "svelte-navigator";
  import { user } from "../store";

  function handleLogout() {
    $user = null;
  }
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg
            class="hidden h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
      >
        <Link class="flex-shrink-0 flex items-center" to="/">
          <img
            class="block lg:hidden h-8 w-auto"
            src="/intouch_marvin_white_logo.png"
            alt="Workflow"
          />
          <img
            class="hidden lg:block h-8 w-auto"
            src="/intouch_marvin_white_logo.png"
            alt="Workflow"
          />
        </Link>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <Link
              to="/impressions-report"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              aria-current="page"
            >
              Impressions Report</Link
            >

            <Link
              to="/upload-pos"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              aria-current="page"
            >
              Upload POS Data</Link
            >
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      >
        <button
          on:click={handleLogout}
          class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          Logout
        </button>

        <!-- Profile dropdown -->
      </div>
    </div>
  </div>
</nav>
