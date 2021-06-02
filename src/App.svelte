<script>
  import DatePicker from "./DatePicker.svelte";
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

    url = `${baseUrl[env]}/impressions/impressionContext?startDate=${
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
</script>

<h1>Impressions Report</h1>
<div>
  <select bind:value={env}>
    <option value="prod">Production</option>
    <option value="stg">Staging</option>
  </select>
</div>
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
