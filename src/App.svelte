<script>
  import {
    Router,
    Route,
    createHistory,
    createMemorySource,
  } from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Navbar from "./components/Navbar.svelte";
  import PosUpload from "./pages/PosUpload.svelte";
  import ImpressionsReport from "./pages/ImpressionsReport.svelte";
  import Home from "./pages/Home.svelte";

  const memoryHistory = createHistory(createMemorySource());
</script>

<!-- <PosUpload />
<ImpressionsReport /> -->

<Router history={memoryHistory} primary={false}>
  <Navbar />

  <Route path="/">
    <Home />
  </Route>
  <main class="max-w-7xl mx-auto px-2 py-5 sm:px-6 lg:px-8">
    <Route path="login">
      <Login />
    </Route>
    <PrivateRoute path="upload-pos" let:location>
      <PosUpload />
    </PrivateRoute>
    <PrivateRoute path="impressions-report" let:location>
      <ImpressionsReport />
    </PrivateRoute>
  </main>
</Router>
