<script>
  import DatePicker from "../components/DatePicker/DatePicker.svelte";
  import Spinner from "../components/Spinner.svelte";
  import { getPlacesAssets } from "../utils/placesAssetsApi";
  import { user } from "../store";

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

  $: placeAssetsData = getPlacesAssets(env, $user);
</script>

<div class="m-auto w-3/5">
  <div
    class="rounded overflow-hidden w-full shadow-lg p-10 bg-white flex items-center flex-col"
  >
    <h1 class="text-3xl pb-4 text-center uppercase font-bold">
      Impressions Report
    </h1>
    <div>
      <label
        class="block text-gray-500 text-sm font-lite mb-2 uppercase"
        for="assetId"
        >Env
      </label>
      <select
        class="shadow appearance-none bg-white w-80 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={env}
      >
        <option value="prod">Production</option>
        <option value="stg">Staging</option>
      </select>
    </div>
    <div>
      <label
        class="block text-gray-500 text-sm font-lite mb-2 uppercase"
        for="start"
        >From
      </label>
      <DatePicker
        on:datechange={onDateChangeStartDate}
        selected={dateRange.startDate}
      />
      <label
        class="block text-gray-500 text-sm font-lite mb-2 uppercase"
        for="end"
        >To
      </label>
      <DatePicker
        on:datechange={onDateChangeEndDate}
        selected={dateRange.endDate}
      />
    </div>

    {#await placeAssetsData}
      <Spinner />
    {:then data}
      <div>
        <label
          class="block text-gray-500 text-sm font-lite mb-2 uppercase"
          for="placeId"
        >
          Place ID
        </label>
        <select
          class="shadow appearance-none bg-white w-80 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={placeId}
          placeholder="Place ID"
          id="placeId"
        >
          <option value="">All</option>
          {#each Object.keys(data) as placeId, i}
            <option>{placeId}</option>
          {/each}
        </select>
      </div>
      <div>
        <label
          class="block text-gray-500 text-sm font-lite mb-2 uppercase"
          for="assetId"
          >Asset ID
        </label>
        <select
          class="shadow appearance-none bg-white w-80 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
        class="bg-blue-700 text-white hover:bg-blue-800 uppercase py-2 px-4 rounded"
        href={url}>Download</a
      >
    </h3>
  </div>
</div>
