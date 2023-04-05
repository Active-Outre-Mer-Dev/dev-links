<script lang="ts">
  export let data;
  import DevLink from "../../components/DevLink.svelte";
</script>

<svelte:head>
  <title>DevLinks | {data.label}</title>
</svelte:head>

<main class="w-4/5 mb-20 ml-auto">
  <h1 class=" text-6xl mb-10">{data.label}</h1>
  <section class="link-grid gap-4 w-full">
    {#each data.links as link}
      <div class="w-full">
        <DevLink blank {link} />
      </div>
    {/each}
  </section>
</main>

<style>
  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, 1fr);
  }
</style>
