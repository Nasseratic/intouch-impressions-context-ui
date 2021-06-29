<script>
  import DatePicker from "./DatePicker.svelte";
  import { getPlacesAssets } from "./placesAssetsApi";
  let env = "prod";

  const baseUrl = {
    prod: "https://intouch-analytics.azurewebsites.net",
    stg: "https://stg-intouch-analytics.azurewebsites.net",
  };

  const startDate = new Date();

  const endDate = new Date();

  let dateRange = {
    startDate,
    endDate,
  };

  let placeId;
  let assetId;
  let startDateStr = "";
  let endDateStr = "";
  let url = "";

  $: {
    let month = "" + (dateRange.startDate.getMonth() + 1),
      day = "" + dateRange.startDate.getDate(),
      year = dateRange.startDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    startDateStr = [year, month, day].join("-");

    month = "" + (dateRange.endDate.getMonth() + 1);
    day = "" + dateRange.endDate.getDate();
    year = dateRange.endDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    endDateStr = [year, month, day].join("-");

    url = `${baseUrl[env]}/impressionContext?startDate=${
      startDateStr + "T00:00:00.000Z"
    }&endDate=${endDateStr + "T23:59:59.999Z"}${
      placeId ? `&placeId=${placeId}` : ""
    }${assetId ? `&assetId=${assetId}` : ""}`;
    console.log(url);
  }

  const onDateChangeStartDate = (d) => {
    dateRange = { ...dateRange, startDate: d.detail };
  };

  const onDateChangeEndDate = (d) => {
    dateRange = { ...dateRange, endDate: d.detail };
  };

  let authed = false;
  let key = localStorage.getItem("key") ?? "";
  const setAuthed = (value) => {
    authed = true;
    localStorage.setItem("key", value);
  };
  $: placeAssetsData = authed ? getPlacesAssets(env, key) : null;
</script>

<div class="flex h-screen bg-gray-300">
  <div class="m-auto w-4/5">
    <div
      class="rounded overflow-hidden w-full shadow-lg p-5 bg-white flex items-center flex-col"
    >
      <img
        src="/intouch_marvin_dark_logo.png"
        width="350"
        alt="marvin"
        class="p-10"
      />
      {#if authed}
        <h1 class="text-3xl	font-bold pb-4 text-center">Impressions Report</h1>
        <div>
          <select
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            bind:value={env}
          >
            <option value="prod">Production</option>
            <option value="stg">Staging</option>
          </select>
        </div>
        <div>
          <DatePicker
            on:datechange={onDateChangeStartDate}
            selected={dateRange.startDate}
          />
          <DatePicker
            on:datechange={onDateChangeEndDate}
            selected={dateRange.endDate}
          />
        </div>

        {#await placeAssetsData}
          <p>Loading...</p>
        {:then data}
          <div>
            <label
              class="block text-gray-700 text-lg font-bold mb-2"
              for="placeId"
            >
              Place ID
            </label>
            <select
              class="shadow appearance-none w-4/5 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              bind:value={placeId}
              placeholder="Place ID"
              id="placeId"
            >
              {#each Object.keys(data) as placeId, i}
                <option>{placeId}</option>
              {/each}
            </select>
          </div>
          <div>
            <label
              class="block text-gray-700 text-lg font-bold mb-2"
              for="assetId"
              >Asset ID
            </label>
            <select
              class="shadow appearance-none w-4/5 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              bind:value={assetId}
              placeholder="Asset ID"
              id="assetId"
            >
              <option value="">All</option>
              {#each data[placeId] ?? [] as assetId, i}
                <option>{assetId}</option>
              {/each}
            </select>
          </div>
        {:catch error}
          <p>An error occurred!</p>
        {/await}

        <h3 class="pt-5">
          <a
            class="bg-blue-200 hover:bg-blue-300 font-bold py-2 px-4 rounded"
            href={url}>Download</a
          >
        </h3>
      {:else}
        <label
          class="block text-gray-700 text-lg font-bold mb-2"
          for="passcode"
        >
          Passcode
        </label>
        <input
          id="passcode"
          class="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={key}
          type="text"
        />
        <button
          on:click={() => setAuthed(key)}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          submit
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .picker-container {
    display: flex;
  }
</style>
