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
  class={`border link duration-200 ease-out hover:border-primary-200 border-neutral-500 w-full flex 
  items-center justify-center text-center  rounded-md bg-gray-800 px-6 py-4 text-neutral-200
   hover:text-primary-100  relative overflow-hidden `}
>
  <span
    style={`background: radial-gradient(99.97% 99.55% at ${$percentage.x}% ${$percentage.y}%, #37245c 0%, rgba(48, 37, 76, 0) 100%);
  `}
    class="w-2/3 h-2/3 absolute -top-2 -left-2 blur-lg rounded-full"
    aria-hidden="true"
  />
  <span class="text-center text-xl relative">{link.label}</span>
</a>
