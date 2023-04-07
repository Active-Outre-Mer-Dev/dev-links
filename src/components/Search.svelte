<script lang="ts">
  import { onMount } from "svelte";
  import AlgoliaSearch from "./AlgoliaSearch.svelte";

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
</script>

{#if showSearch}
  <AlgoliaSearch {onClose} />
{/if}
