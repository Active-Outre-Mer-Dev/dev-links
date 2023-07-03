<script lang="ts">
  import { onMount } from "svelte";

  let input: HTMLInputElement;
  let search = "";
  let timer: NodeJS.Timer;
  let isLoading = false;

  export let onChange: (data: any[]) => void;

  onMount(() => {
    if (input) {
      input.focus();
    }
  });

  $: {
    if (search) {
      onSearch();
    }
  }

  const onSearch = async () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      isLoading = true;
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search })
      });
      const json = await res.json();
      console.log(json.data);
      onChange(json.data);
      isLoading = false;
    }, 1500);
  };

  const onReset = () => {
    search = "";
  };
</script>

<div
  class={`rounded-t-md overflow-hidden flex gap-2 border-b
       border-b-neutral-100 dark:border-b-neutral-700
        items-center px-2 mb-4`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="basis-5 text-gray-600 dark:text-gray-200"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
  <input
    bind:value={search}
    bind:this={input}
    class={`appearance-none h-12 outline-none grow block bg-wite dark:bg-neutral-800 
    dark:text-gray-200`}
  />
  <div class="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      data-loading={isLoading}
      class={`animate-spin data-[loading=true]:opacity-100 opacity-0`}
      ><line x1="12" x2="12" y1="2" y2="6" /><line x1="12" x2="12" y1="18" y2="22" /><line
        x1="4.93"
        x2="7.76"
        y1="4.93"
        y2="7.76"
      /><line x1="16.24" x2="19.07" y1="16.24" y2="19.07" /><line x1="2" x2="6" y1="12" y2="12" /><line
        x1="18"
        x2="22"
        y1="12"
        y2="12"
      /><line x1="4.93" x2="7.76" y1="19.07" y2="16.24" /><line
        x1="16.24"
        x2="19.07"
        y1="7.76"
        y2="4.93"
      /></svg
    >

    <button
      on:click={onReset}
      aria-label="Close command menu"
      class="basis-5 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="basis-5 text-gray-600 dark:text-gray-200"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </div>
</div>
