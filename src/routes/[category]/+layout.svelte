<script lang="ts">
  export let data;
  import MobileHeader from "../../components/MobileHeader.svelte";
</script>

<div class="lg:pt-20 min-h-screen lg:px-20">
  <MobileHeader links={data.categories} title={data.label} />
  <aside class="w-1/5 hidden lg:block fixed top-20 left-1/5 lg:pr-20">
    <p class="text-neutral-500 dark:text-neutral-200 mb-5 text-lg">Categories:</p>
    <ul
      class="space-y-4 scroll-container border-b h-72 overflow-y-scroll border-neutral-300 dark:border-neutral-600 w-full pb-4"
    >
      {#each data.categories as link}
        <li>
          <a
            href={link.href}
            data-current={link.current}
            class={`data-[current=true]:dark:text-primary-300
            data-[current=true]:text-primary-600
             duration-200 ease-out`}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
    <a
      href="/"
      class="mt-7 block text-neutral-500 dark:text-neutral-200 hover:text-neutral-700 dark:hover:text-neutral-100 duration-200 ease-out"
      >← Return to home</a
    >
  </aside>
  <slot />
</div>
