<script lang="ts">
  import CommandGroup from "./CommandGroup.svelte";
  import CommandInput from "./CommandInput.svelte";
  import CommandItem from "./CommandItem.svelte";
  import CommandList from "./CommandList.svelte";
  import { useCommand } from "$lib/command-store";
  import { onMount } from "svelte";

  onMount(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "auto");
  });

  export let onClose: () => void;

  type Results = [
    string,
    {
      href: string;
      label: string;
    }[]
  ][];

  let results: Results = [];

  const onChange = (data: any[]) => {
    results = data;
  };
  $: {
    console.log(Array.isArray(results));
    console.log(results);
  }
</script>

<div
  on:click={onClose}
  class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm"
/>
<div
  class={`bg-white z-[9999] ring-neutral-100 ring-1  fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4
      dark:bg-neutral-800 dark:ring-neutral-700 rounded-md w-2/4 `}
>
  <CommandInput {onChange} />
  <CommandList>
    {#each results as [category, links]}
      <CommandGroup heading={category}>
        {#each links as link}
          <CommandItem>{link.label}</CommandItem>
        {/each}
      </CommandGroup>
    {/each}
  </CommandList>
</div>
