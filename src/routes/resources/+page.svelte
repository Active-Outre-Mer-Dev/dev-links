<script lang="ts">
  import DevLink from "../../components/DevLink.svelte";
  export let data;
</script>

<h1 class="font-heading text-5xl text-center font-medium mb-10 mt-20">Resources</h1>

<div class="link-grid w-3/5 mx-auto gap-4 mb-36">
  {#each data.links as link}
    <DevLink {link} />
  {/each}
</div>

<style>
  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, 1fr);
  }
</style>
