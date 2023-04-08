<script lang="ts">
  type HTMLEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLAnchorElement;
  };
  type LinkData = {
    href: string;
    label: string;
  };

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let link: LinkData;
  export let blank = false;

  let anchor: HTMLAnchorElement;
  const percentage = tweened({ x: 2.17, y: 40 }, { duration: 250, easing: cubicOut });
  const move = (e: HTMLEvent) => {
    const style = getComputedStyle(anchor);
    percentage.set({
      x: (e.offsetX / parseInt(style.width)) * 100,
      y: (e.offsetY / parseInt(style.height)) * 100
    });
  };
  const leave = () => {
    percentage.set({ x: 2.17, y: 40 });
  };
</script>

<a
  bind:this={anchor}
  on:mousemove={move}
  on:mouseleave={leave}
  target={blank ? "_blank" : ""}
  href={link.href}
  class={`border link h-full duration-200 ease-out hover:border-primary-600 dark:hover:border-primary-200 border-neutral-300 dark:border-neutral-500 w-full flex 
  items-center justify-center text-center  rounded-md px-6 py-4 text-neutral-800 dark:text-neutral-200
   hover:text-primary-600 dark:hover:text-primary-100 group  relative overflow-hidden `}
>
  {#if blank}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`absolute top-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
      duration-200 ease-out`}
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
      <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
      <path d="M10 14l10 -10" />
      <path d="M15 4l5 0l0 5" />
    </svg>
  {/if}
  <span
    style={`background: radial-gradient(99.97% 99.55% at ${$percentage.x}% ${$percentage.y}%, #37245c 0%, rgba(48, 37, 76, 0) 100%);
  `}
    class="w-2/3 h-2/3 absolute dark:block hidden -top-2 -left-2 blur-lg rounded-full"
    aria-hidden="true"
  />
  <span class="text-center text-xl relative">{link.label}</span>
</a>
