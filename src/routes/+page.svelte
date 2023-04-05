<script lang="ts">
  import DevLink from "../components/DevLink.svelte";
  export let data;
</script>

<svelte:head>
  <title>DevLinks</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col items-center pt-20 mb-20">
  <h1 class="text-center text-6xl mb-10">DevLinks</h1>
  <div class="w-11/12 lg:w-3/6 space-y-4 mb-4 text-lg text-neutral-200">
    <p>
      Whether you're a seasoned developer or just getting started, our site provides links to a variety of
      websites and tools that can aid in your web development projects. From color palette generators and font
      selectors to code editors and version control systems, we've curated a list of the best tools and
      resources available to help you streamline your workflow and improve your productivity.
    </p>
    <p>
      Our site is designed to be user-friendly, with easy-to-navigate categories and search functionality to
      help you find exactly what you're looking for. So, whether you're building a new website from scratch or
      just need to find the right tool for a specific task, our website has you covered.
    </p>
  </div>
</section>
<section class="flex flex-col items-center pb-20">
  <h2 class="text-4xl mb-7">Categories</h2>
  <div class="link-grid gap-4 w-11/12 lg:w-3/6">
    {#each data.links as link}
      <div class="basis-1/4 grow">
        <DevLink {link} />
      </div>
    {/each}
  </div>
</section>

<style>
  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, 1fr);
  }
</style>
