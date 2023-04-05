<script>
  import DevLink from "../components/DevLink.svelte";
  export let data;
</script>

<svelte:head>
  <title>DevLinks</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col items-center pt-20 mb-20">
  <h1 class="text-center text-6xl mb-10">DevLinks</h1>
  <div class="w-3/6 space-y-4 mb-4 text-lg text-neutral-200">
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
  <h2 class="text-4xl mb-4">Categories</h2>
  <div class="grid link-grid grid-cols-3 gap-4 w-3/6">
    {#each data.links as link}
      <DevLink {link} />
    {/each}
  </div>
</section>

<style>
  .link-grid {
    grid-auto-rows: 150px;
  }
</style>
