<script>
  import { createEventDispatcher } from "svelte";
  import Calender from "./Calender.svelte";
  import { getMonthName } from "./date-time.js";

  const dispatch = createEventDispatcher();

  // props
  export let isAllowed = () => true;
  export let selected = new Date();

  // state
  let date, month, year, showDatePicker;

  // so that these change with props
  $: {
    date = selected.getDate();
    month = selected.getMonth();
    year = selected.getFullYear();
  }

  // handlers
  const onFocus = () => {
    setTimeout(() => {
      showDatePicker = true;
    }, 200);
  };
  const onBlur = () => {
    setTimeout(() => {
      showDatePicker = false;
    }, 200);
  };

  const next = () => {
    if (month === 11) {
      month = 0;
      year = year + 1;
      return;
    }
    month = month + 1;
  };

  const prev = () => {
    if (month === 0) {
      month = 11;
      year -= 1;
      return;
    }
    month -= 1;
  };

  const onDateChange = (d) => {
    showDatePicker = false;
    console.log(d);
    dispatch("datechange", d.detail);
  };
</script>

<div class="relative">
  <input
    class="z-0 shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    on:focus={onFocus}
    on:blur={onBlur}
    value={selected.toDateString()}
  />
  {#if showDatePicker}
    <div class="box z-10">
      <div class="month-name">
        <div class="center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
            on:click={prev}>Prev</button
          >
        </div>
        <div class="center">{getMonthName(month)} {year}</div>
        <div class="center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
            on:click={next}>Next</button
          >
        </div>
      </div>
      <Calender
        {month}
        {year}
        date={selected}
        {isAllowed}
        on:datechange={onDateChange}
      />
    </div>
  {/if}
</div>

<style>
  .relative {
    position: relative;
  }
  .box {
    background-color: azure;
    position: absolute;
    top: 40px;
    left: 0px;
    border: 1px solid green;
    display: inline-block;
  }

  .month-name {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 6px 0;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
