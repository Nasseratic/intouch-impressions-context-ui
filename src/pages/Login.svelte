<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../store";

  const navigate = useNavigate();
  const location = useLocation();

  let username;
  let password;

  function handleSubmit() {
    $user = { username, password };
    const from = ($location.state && $location.state.from) || "/";
    navigate(from, { replace: true });
  }
</script>

<div class="m-auto w-3/5">
  <div
    class="rounded overflow-hidden w-full shadow-lg p-5 bg-white flex items-center flex-col"
  >
    <h3 class="text-3xl	font-bold pb-4 text-center uppercase py-5 ">Login</h3>
    <form class="flex align-items flex-col m-auto" on:submit={handleSubmit}>
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={username}
        type="text"
        name="username"
        placeholder="Username"
      />
      <br />
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={password}
        type="password"
        name="password"
        placeholder="Password"
      />
      <button
        class="bg-blue-700 uppercase hover:bg-blue-800 text-white py-2 m-5 px-4 rounded"
        type="submit">Login</button
      >
    </form>
  </div>
</div>
