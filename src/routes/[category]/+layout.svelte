<script lang="ts">
  export let data;
</script>

<div class="flex pt-20 min-h-screen px-20 gap-10">
  <aside class="basis-1/5">
    <p class="text-neutral-200 mb-5 text-lg">Categories:</p>
    <ul class="space-y-4 border-b border-neutral-600 w-full pb-4">
      {#each data.categories as link}
        <li>
          <a
            href={link.href}
            data-current={link.current}
            class="data-[current=true]:text-secondary-400 duration-200 ease-out"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
    <a href="/" class="mt-7 block text-neutral-200 hover:text-neutral-100 duration-200 ease-out"
      >← Return to home</a
    >
  </aside>
  <slot />
</div>
