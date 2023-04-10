<script lang="ts">
  import { onMount } from "svelte";
  import algoliaSearch from "algoliasearch";
  import instantsearch from "instantsearch.js";
  import { hits, searchBox } from "instantsearch.js/es/widgets/";
  import { item } from "$lib/algolia-template";
  import { fade, fly } from "svelte/transition";
  import { cubicOut as easing } from "svelte/easing";

  export let onClose: () => void;

  const appId = import.meta.env.VITE_ALGOLIA_APPLICATION_ID;
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;

  const testSearch = instantsearch({
    indexName: "devlinks",
    searchClient: algoliaSearch(appId, searchKey)
  });

  let hitsContainer: HTMLDivElement;
  let searchContainer: HTMLDivElement;

  onMount(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "auto");
  });

  onMount(() => {
    const algoliaHits = hits({
      container: hitsContainer,
      templates: {
        empty: "No results",
        item
      }
    });

    const algoliaSearchBox = searchBox({
      container: searchContainer,
      placeholder: "Search for resource",
      autofocus: true,
      cssClasses: {
        input:
          "w-full outline-none appearance-none border-1 rounded-sm pl-4 py-2 border-neutral-500 relative bg-neutral-100 dark:bg-neutral-900",
        submitIcon: "absolute right-2 top-2/4 -translate-y-2/4 w-4 h-4 fill-neutral-300",
        root: "relative w-full",
        resetIcon: "absolute top-2/4 -translate-y-2/4 right-8 w-4 h-4 fill-neutral-500"
      }
    });
    testSearch.addWidgets([algoliaHits, algoliaSearchBox]);
    testSearch.start();
    const input = searchContainer.getElementsByTagName("input")[0];
    input.focus();
    return () => {
      testSearch.removeWidgets([algoliaHits, algoliaSearchBox]);
    };
  });
</script>

<div
  role="dialog"
  aria-modal="true"
  transition:fade={{ duration: 200, easing }}
  class="fixed flex justify-center items-center top-0 left-0 bg-neutral-900/5 backdrop-blur-sm w-full h-full z-50"
>
  <div aria-hidden on:click={onClose} class="fixed top-0 left-0 w-full h-full" />
  <div
    class="w-3/6 z-[55] bg-neutral-50 dark:bg-neutral-800 border-neutral-200 border dark:border-0 rounded-sm"
    transition:fly={{ y: 200, duration: 200, easing, delay: 0.2 }}
  >
    <div bind:this={searchContainer} id="algolia-search" class=" w-full" />
    <div bind:this={hitsContainer} id="algolia-hits" class=" h-64 pt-4 px-4 overflow-y-scroll" />
  </div>
</div>
