<script lang="ts">
  import { onMount } from "svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import NavigationProgress from "./NavigationProgress.svelte";
  import CustomSearch from "./CustomSearch.svelte";

  onMount(() => {
    const focus = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        showSearch = !showSearch;
        if (!init) init = true;
      }
    };
    window.addEventListener("keydown", focus);
    return () => window.removeEventListener("keydown", focus);
  });

  let showSearch = false;
  let init = false;

  const onClose = () => {
    showSearch = false;
  };
  const onOpen = () => {
    showSearch = true;
    if (!init) init = true;
  };
</script>

<NavigationProgress />
<header
  class="border-b duration-200 ease-out hidden z-50 lg:flex items-center justify-center bg-neutral-50/50 border-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/50 h-16 w-full sticky top-0 left-0 backdrop-blur-sm"
>
  <div class="w-4/5 justify-between flex items-center h-full">
    <div>
      <img src="/aom.svg" alt="" width={65} height={65} />
    </div>
    <div class="flex items-center justify-center h-full gap-4">
      <button
        on:click={onOpen}
        class={`rounded-full  h-3/4 px-8 gap-8  flex items-center justify-between
         bg-neutral-50 border-neutral-200 dark:bg-neutral-900 border dark:border-neutral-700`}
      >
        <div class="space-x-2 text-neutral-600 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <span> Search </span>
        </div>
        <div class="duration-200 ease-out text-neutral-500 dark:text-neutral-300">
          <kbd
            class="bg-neutral-50 duration-200 ease-out dark:bg-neutral-800 p-1 w-5 h-5 text-xs rounded-sm uppercase"
            >Ctrl</kbd
          >
          <kbd class="bg-neutral-50 duration-200 ease-out dark:bg-neutral-800 p-1 w-5 h-5 text-xs rounded-sm"
            >K</kbd
          >
        </div>
      </button>
      <ThemeToggle />
    </div>
  </div>
</header>
{#if showSearch}
  <CustomSearch {onClose} />
{/if}
