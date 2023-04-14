<script lang="ts">
  export let data;
  import DevLink from "../../components/DevLink.svelte";
  import DevLinkLoad from "../../components/DevLinkLoad.svelte";
  const defaultLinks = Array(4).fill(null);
</script>

<svelte:head>
  <title>DevLinks | {data.label}</title>
</svelte:head>

<main class="px-5 lg:px-0 lg:w-4/5 mb-20 lg:ml-auto">
  <h1 class="text-7xl text-center lg:text-start mb-10">{data.label}</h1>
  <section class="link-grid gap-4 w-full">
    {#await data.streamed.links}
      {#each defaultLinks as _}
        <DevLinkLoad />
      {/each}
    {:then links}
      {#each links as link}
        <div class="w-full">
          <DevLink {link} blank />
        </div>
      {/each}
    {/await}
  </section>
</main>

<style>
  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, 1fr);
  }
</style>
