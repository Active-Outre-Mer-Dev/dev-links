<script lang="ts">
  import { onMount } from "svelte";

  let AlgoliaSearch: any;

  let showSearch = false;
  let init = false;
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
  const onClose = () => {
    showSearch = false;
  };
  const dynamicImport = async () => {
    AlgoliaSearch = (await import("./AlgoliaSearch.svelte")).default;
  };
  $: {
    if (init) {
      dynamicImport();
    }
  }
</script>

{#if showSearch}
  <svelte:component this={AlgoliaSearch} {onClose} />
{/if}
