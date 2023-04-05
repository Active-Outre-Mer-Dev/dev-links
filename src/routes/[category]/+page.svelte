<script lang="ts">
  export let data;
  import DevLink from "../../components/DevLink.svelte";
  console.log(data);
</script>

<main class="min-h-screen pt-20">
  <h1 class="text-center text-6xl mb-10">{data.label}</h1>
  <section class="flex items-center flex-col">
    <div class="grid grid-cols-1 gap-4 w-2/6">
      {#each data.links as link}
        <DevLink blank {link} />
      {/each}
    </div>
  </section>
</main>
