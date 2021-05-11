<script>
  import DatePicker from "./DatePicker.svelte";

  let dateRange = {
    startDate: new Date(),
    endDate: new Date(),
  };

  let placeId;
  let assetId;

  const onDateChange = (key) => (d) => {
    dateRange = { ...dateRange, [key]: d.detail };
  };
</script>

<h1>Impressions Report</h1>

<div class="picker-container">
  <DatePicker
    on:datechange={onDateChange("startDate")}
    selected={dateRange.startDate}
  />
  <DatePicker
    on:datechange={onDateChange("endDate")}
    selected={dateRange.endDate}
  />
</div>

<div>
  <input value={placeId} type="number" placeholder="Place ID" />
</div>
<div>
  <input value={assetId} type="number" placeholder="Asset ID" />
</div>

<h3>
  <a
    href={`http://intouch-dev-druid.northeurope.cloudapp.azure.com/impressions/impressionContext?startDate=${dateRange.startDate.toISOString()}&endDate=${dateRange.endDate.toISOString()}${
      placeId ? `&placeId=${placeId}` : ""
    }${assetId ? `&assetId=${assetId}` : ""}`}>Download</a
  >
</h3>

<style>
  .picker-container {
    display: flex;
  }
</style>
