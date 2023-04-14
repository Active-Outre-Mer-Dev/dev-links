<script lang="ts">
  type HTMLEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  };

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let anchor: HTMLDivElement;
  const percentage = tweened({ x: 0, y: 0 }, { duration: 250, easing: cubicOut });
  const move = (e: HTMLEvent) => {
    const style = getComputedStyle(anchor);
    percentage.set({
      x: (e.offsetX / parseInt(style.width)) * 100,
      y: (e.offsetY / parseInt(style.height)) * 100
    });
  };
  const leave = () => {
    percentage.set({ x: 0, y: 0 });
  };
</script>

<div
  bind:this={anchor}
  on:mousemove={move}
  on:mouseleave={leave}
  class={`border link h-full duration-200 ease-out hover:border-primary-600 dark:hover:border-primary-200 border-neutral-300 dark:border-neutral-500 w-full flex 
    items-center justify-center text-center  rounded-md px-6 py-4 text-neutral-800 dark:text-neutral-200
     hover:text-primary-600 dark:hover:text-primary-100 group grayscale  relative overflow-hidden `}
>
  <span
    style={`background: radial-gradient(circle at ${$percentage.x}% ${$percentage.y}%, #37245c, rgba(48, 37, 76, 0) 50%);
    `}
    class="w-full h-full animate-pulse absolute dark:block hidden top-0 blur-lg left-0"
    aria-hidden="true"
  />
  <span class="text-center bg-neutral-600 rounded-sm text-xl animate-pulse h-3 w-2/4" />
</div>
