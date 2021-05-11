<script>
  import DatePicker from "./DatePicker.svelte";

  const baseUrl = "https://intouch-analytics.azurewebsites.net";

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  let dateRange = {
    startDate,
    endDate,
  };

  let placeId;
  let assetId;

  $: url = `${baseUrl}/impressions/impressionContext?startDate=${dateRange.startDate.toISOString()}&endDate=${dateRange.endDate.toISOString()}${
    placeId ? `&placeId=${placeId}` : ""
  }${assetId ? `&assetId=${assetId}` : ""}`;

  $: console.log(`the count is ${url}`);

  const onDateChangeStartDate = (d) => {
    d.detail.setHours(0, 0, 0, 0);
    dateRange = { ...dateRange, startDate: d.detail };
  };

  const onDateChangeEndDate = (d) => {
    d.detail.setHours(23, 59, 59, 999);
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
  <input bind:value={placeId} type="number" placeholder="Place ID" />
</div>
<div>
  <input bind:value={assetId} type="number" placeholder="Asset ID" />
</div>

<h3>
  <a href={url}>Download</a>
</h3>

<style>
  .picker-container {
    display: flex;
  }
</style>
