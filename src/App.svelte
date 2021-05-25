<script>
  import DatePicker from "./DatePicker.svelte";

  const baseUrl = "https://intouch-analytics.azurewebsites.net";

  const startDate = new Date();

  const endDate = new Date();

  let dateRange = {
    startDate,
    endDate,
  };

  let placeId;
  let assetId;

  $: url = `${baseUrl}/impressions/impressionContext?startDate=${
    dateRange.startDate.toISOString().substring(0, 10) + "T00:00:00.000Z"
  }&endDate=${
    dateRange.endDate.toISOString().substring(0, 10) + "T23:59:59.999Z"
  }${placeId ? `&placeId=${placeId}` : ""}${
    assetId ? `&assetId=${assetId}` : ""
  }`;

  $: console.log(`url: ${url}`);

  const onDateChangeStartDate = (d) => {
    dateRange = { ...dateRange, startDate: d.detail };
  };

  const onDateChangeEndDate = (d) => {
    dateRange = { ...dateRange, endDate: d.detail };
  };
</script>

<h1>Impressions Report</h1>

<div class="picker-container">
  <DatePicker
    on:datechange={onDateChangeStartDate}
    selected={dateRange.startDate}
  />
  <DatePicker
    on:datechange={onDateChangeEndDate}
    selected={dateRange.endDate}
  />
</div>

<div>
  <input bind:value={placeId} min={1} type="number" placeholder="Place ID" />
</div>
<div>
  <input bind:value={assetId} min={1} type="number" placeholder="Asset ID" />
</div>

<h3>
  <a href={url}>Download</a>
</h3>

<style>
  .picker-container {
    display: flex;
  }
</style>
