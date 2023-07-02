<script lang="ts">
  import { onMount } from "svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import NavigationProgress from "./NavigationProgress.svelte";
  import Command from "./Command.svelte";

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

  let showSearch = true;
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
  class="border-b duration-200 ease-out hidden z-50 lg:flex items-center justify-center bg-neutral-50/50 border-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/50 h-16 w-full sticky top-0 left-0 backdrop-blur-md"
>
  <div class="w-4/5 justify-between flex items-center h-full">
    <div class="flex gap-4 items-center">
      <a href={"/"} class="inline-block mr-4">
        <img src="/aom.svg" alt="" width={65} height={65} />
      </a>
      <a href="/articles" class="hover:text-primary-300">Articles</a>
      <a href="/resources" class="hover:text-primary-300">Resources</a>
    </div>
    <div class="flex items-center justify-center h-full gap-4">
      <button
        on:click={onOpen}
        class={`rounded-md items-center flex gap-1 px-4 min-w-fit text-neutral-500 h-8 ring-1 ring-neutral-200
          dark:ring-neutral-700`}
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
        <kbd
          class="text-xs inline-block bg-neutral-200/30 dark:bg-neutral-600/30 ring-1 ring-neutral-100 dark:ring-neutral-700 ml-6 p-[2px] rounded-sm"
        >
          Ctrl K
        </kbd>
      </button>
      <ThemeToggle />
    </div>
  </div>
</header>
{#if showSearch}
  <Command {onClose} />
{/if}
