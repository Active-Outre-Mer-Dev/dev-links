<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicOut as easing } from "svelte/easing";
  type Hits = {
    href: string;
    label: string;
  };
  let showSearch = true;
  let timeoutId: NodeJS.Timeout | null;
  let hits: Hits[] = [];
  onMount(() => {
    const focus = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        showSearch = !showSearch;
      }
    };
    window.addEventListener("keydown", focus);
    return () => window.removeEventListener("keydown", focus);
  });
  let search = "";
  const searchAlgolia = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeoutId = setTimeout(async () => {
      const res = await fetch("/api/algolia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: search })
      });
      const json = await res.json();
      hits = json.hits;
    }, 3000);
  };
  $: {
    if (search) {
      searchAlgolia();
    }
  }
</script>

{#if showSearch}
  <div
    aria-modal="true"
    transition:fade={{ duration: 200, easing }}
    class="fixed flex justify-center items-center top-0 left-0 bg-neutral-900/5 backdrop-blur-sm w-full h-full z-50"
  >
    <div class="w-3/6 bg-neutral-700 p-10" transition:fly={{ y: 200, duration: 200, easing, delay: 0.2 }}>
      <input
        bind:value={search}
        type="text"
        class="appearance-none outline-none text-neutral-300 bg-neutral-800 border-neutral-600 px-4 py-1 rounded-sm"
      />
      <p>{search}</p>
      {#each hits as { href, label }}
        <a {href} target="_blank">{label}</a>
      {/each}
    </div>
  </div>
{/if}
