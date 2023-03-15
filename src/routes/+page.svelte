<script>
  import DevLink from "../components/DevLink.svelte";
  export let data;
</script>

<svelte:head>
  <title>DevLinks</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="min-h-screen bg-gray-900 flex flex-col items-center text-zinc-300 pt-20">
  <h1 class="text-center text-6xl mb-10 ">DevLinks</h1>
  <div class="w-2/6 space-y-4">
    {#each data.links as link}
      <DevLink {link} />
    {/each}
  </div>
</section>
