<script>
  import DatePicker from "../components/DatePicker/DatePicker.svelte";
  import Spinner from "../components/Spinner.svelte";
  import { getPlacesAssets } from "../utils/placesAssetsApi";
  import { user } from "../store";
  import moment from "moment";
  import Label from "../components/Label.svelte";
  import { text } from "svelte/internal";

  const startDate = new Date();

  const endDate = new Date();

  let env = "prod";

  let dateRange = {
    startDate,
    endDate,
  };

  const onDateChangeStartDate = (d) => {
    dateRange = { ...dateRange, startDate: d.detail };
  };

  const onDateChangeEndDate = (d) => {
    dateRange = { ...dateRange, endDate: d.detail };
  };

  let placeId;
  let withContext = false;
  let assetId;
  let url = "";

  const baseUrl = {
    prod: process.env.IMPRESSIONS_REPORT_URL,
    stg: process.env.IMPRESSIONS_REPORT_URL_STG,
  };

  $: {
    const start =
      moment(dateRange.startDate).format("YYYY-MM-DD") + "T00:00:00.000Z";
    const end =
      moment(dateRange.endDate).format("YYYY-MM-DD") + "T23:59:59.999Z";

    url = `${baseUrl[env]}?startDate=${start}&endDate=${end}&withContext=${withContext}`;
    if (placeId) url = `${url}&placeId=${placeId}`;
    if (assetId) url = `${url}&assetId=${assetId}`;
  }

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
      <Label text="Enviroment" forInput="env" />
      <select
        class="shadow appearance-none bg-white w-80 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={env}
        id="env"
      >
        <option value="prod">Production</option>
        <option value="stg">Staging</option>
      </select>
    </div>
    <div>
      <Label text="From Date" forInput="start" />
      <DatePicker
        on:datechange={onDateChangeStartDate}
        selected={dateRange.startDate}
      />

      <Label text="To Date" forInput="end" />
      <DatePicker
        on:datechange={onDateChangeEndDate}
        selected={dateRange.endDate}
      />
    </div>
    <div>
      <Label text="With Context" forInput="withContext" />
      <select
        class="shadow appearance-none bg-white w-80 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={withContext}
        placeholder="With Context"
        id="withContext"
      >
        <option value={false}>False</option>
        <option value={true}>True</option>
      </select>
    </div>
    {#await placeAssetsData}
      <Spinner />
    {:then data}
      <div>
        <Label text="Place Id" forInput="placeId" />
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
        <Label text="Asset ID" forInput="assetId" />

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
