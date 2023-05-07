<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicOut as easing } from "svelte/easing";
  import links from "$lib/links.json";
  export let onClose: () => void;

  onMount(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "auto");
  });
  onMount(() => {
    input.focus();
  });

  let input: HTMLInputElement;
  let search = "";
  let filteredLinks = Object.entries(links).slice(0, 5);
  $: {
    if (search) {
      let newLinks = Object.entries(links).filter(([key]) =>
        key.includes(search.replaceAll(" ", "-").toLowerCase())
      );
      if (newLinks.length === 0) {
        newLinks = Object.entries(links)
          .filter(([, value]) => {
            return value.links.some(val =>
              val.label.toLowerCase().replaceAll(" ", "").includes(search.replaceAll(" ", "").toLowerCase())
            );
          })
          .map(([key, value]) => {
            return [
              key,
              {
                ...value,
                links: value.links.filter(val =>
                  val.label
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .includes(search.replaceAll(" ", "-").toLowerCase())
                )
              }
            ];
          });
      }
      filteredLinks = newLinks;
    } else {
      filteredLinks = Object.entries(links).slice(0, 5);
    }
  }
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
    <input
      bind:this={input}
      bind:value={search}
      type="search"
      id="algolia-search"
      class={`w-full outline-none appearance-none border-1 rounded-sm pl-4 py-2 border-neutral-500 
      relative bg-neutral-100 dark:bg-neutral-700`}
    />
    <div id="algolia-hits" class=" h-96 pt-4 px-4 overflow-y-scroll">
      {#if search}
        <ul class="space-y-4">
          {#each filteredLinks.slice(0, 5) as link}
            <li>
              <p class="text-lg mb-2 text-neutral-300 capitalize">{link[0].replaceAll("-", " ")}</p>
              <ul class="space-y-2">
                {#each link[1].links.slice(0, 5) as resource}
                  <li class="hover:bg-neutral-700 p-2">
                    <a href={resource.href}>
                      <span class="block">
                        {resource.label}
                      </span>
                      <span>
                        {resource.href}
                      </span>
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      {:else}
        <ul class="space-y-4">
          {#each filteredLinks.slice(0, 5) as link}
            <li>
              <p class="text-lg mb-2 text-neutral-300 capitalize">{link[0].replaceAll("-", " ")}</p>
              <ul class="space-y-2">
                {#each link[1].links.slice(0, 5) as resource}
                  <li class="hover:bg-neutral-700">
                    <a target="_blank" href={resource.href} class="flex flex-col p-2 rounded-sm">
                      <span>
                        {resource.label}
                      </span>
                      <span>
                        {resource.href}
                      </span>
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
