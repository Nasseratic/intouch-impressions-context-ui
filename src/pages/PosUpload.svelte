<script>
  import DatePicker from "../components/DatePicker/DatePicker.svelte";
  import Spinner from "../components/Spinner.svelte";
  import { getPlacesAssets } from "../utils/placesAssetsApi";
  import { user } from "../store";
  import { uploadToBlob } from "../utils/blobUpload";

  let fileinput, sas, startDate, endDate, store;

  const onFileSelected = (e, sas) => {
    if (!sas || !startDate || !endDate || !store)
      return alert("Please enter all details");
    let file = e.target.files[0];
    uploadToBlob({ file, sas, startDate, endDate, store });
  };

  $: placeAssetsData = getPlacesAssets("prod", $user);

  const onDateChangeStart = ({ detail }) => (startDate = detail);
  const onDateChangeEnd = ({ detail }) => (endDate = detail);
</script>

<div class="m-auto w-3/5">
  <div class="rounded w-full shadow-lg p-5 bg-white flex items-center flex-col">
    {#await placeAssetsData}
      <Spinner />
    {:then data}
      <label class="block text-gray-700 text-lg font-bold mb-2" for="store">
        Store ID
      </label>
      <select
        class="shadow appearance-none w-80 border rounded py-2 px-3 bg-white text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={store}
        placeholder="Store ID"
        id="store"
      >
        <option value="">All</option>
        {#each Object.keys(data) as store, i}
          <option>{store}</option>
        {/each}
      </select>
    {:catch error}
      <p>An error occurred!</p>
    {/await}

    <DatePicker on:datechange={onDateChangeStart} selected={startDate} />
    <DatePicker on:datechange={onDateChangeEnd} selected={endDate} />
    <input
      class="shadow appearance-none w-80 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline overflow-hidden"
      type="text"
      placeholder="sas token"
      bind:value={sas}
    />

    <h1 class="text-3xl font-bold uppercase">Upload File</h1>

    <button
      class="shadow appearance-none w-80 border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      on:click={() => {
        fileinput.click();
      }}
    >
      Choose CSV File
    </button>
    <input
      style="display:none"
      type="file"
      accept=".csv"
      on:change={(e) => onFileSelected(e, sas)}
      bind:this={fileinput}
    />
  </div>
</div>
