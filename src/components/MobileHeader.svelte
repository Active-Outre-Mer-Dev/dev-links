<script lang="ts">
  import type { LayoutData } from "../routes/[category]/$types";
  import { fly } from "svelte/transition";

  export let links: LayoutData["categories"];
  export let title: string;

  let drawer = false;
  const onOpen = () => {
    drawer = true;
  };
  const onClose = async () => {
    drawer = false;
  };
</script>

<div
  class="bg-neutral-900 border-b border-neutral-700 sticky flex justify-between items-center px-5 top-0 left-0 z-50 lg:hidden h-16 w-full mb-20"
>
  <p>{title}</p>
  <button aria-label="Open menu" on:click={onOpen}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-menu-2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg></button
  >
</div>
{#if drawer}
  <div
    transition:fly={{ x: screen.width, duration: 200 }}
    class="fixed w-full pt-20 flex flex-col items-center top-0 left-0 z-50 h-screen bg-neutral-800 border-r-neutral-500 border-r"
  >
    <button aria-label="Close menu" class="fixed top-4 right-4" on:click={onClose}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-x"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
    <p class="text-neutral-200 text-lg mb-2">Categories:</p>
    <ul class="space-y-4">
      {#each links as link}
        <li>
          <a
            on:click={() => (drawer = false)}
            href={link.href}
            data-current={link.current}
            class="data-[current=true]:text-secondary-400 duration-200 ease-out"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
    <a
      on:click={() => (drawer = false)}
      href="/"
      class="mt-7 block text-neutral-200 hover:text-neutral-100 duration-200 ease-out">← Return to home</a
    >
  </div>
{/if}
