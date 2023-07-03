<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>DevLinks | Articles</title>
  <meta name="description" content="Svelte demo app" />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.7.1/dist/instantsearch.min.css"
  />
</svelte:head>

<h1 class="text-center font-medium font-heading text-5xl mb-10 mt-20">Articles</h1>
<div class="mx-auto w-3/5 grid gap-20 mb-36">
  {#each data.articles as article}
    <a href={article.href} target="_blank" class="group">
      <h2
        class={`text-2xl font-medium font-heading mb-4 group-hover:text-primary-500
        dark:group-hover:text-primary-300 `}
      >
        {article.title}
      </h2>
      <p class="text-lg mb-2">{article.description}</p>
      <span class="text-neutral-700 dark:text-neutral-200 font-medium">{article.author}</span>
    </a>
  {/each}
</div>

<style>
  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, 1fr);
  }
</style>
