<svelte:head>
  <title>DevLinks</title>
  <meta name="description" content="Svelte demo app" />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.7.1/dist/instantsearch.min.css"
  />
</svelte:head>

<section class="flex flex-col items-center pt-20 mb-20">
  <h1 class="text-center text-7xl mb-10">DevLinks</h1>
  <div class="w-11/12 lg:w-3/6 space-y-4 mb-4 text-lg text-neutral-900 dark:text-neutral-200">
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
  <div class="flex gap-6 mt-5">
    <a
      href={"/resources"}
      class="px-4 h-10 flex items-center bg-primary-500 rounded-md font-medium text-primary-50"
      >View Resources</a
    >
    <a href={"/articles"} class="bg-primary-50/10 px-4 flex items-center h-10 font-medium rounded-md"
      >Read Articles</a
    >
  </div>
</section>

<!-- <section class="flex flex-col items-center pb-20">
  <h2 class="text-5xl mb-7">Categories</h2>
  <div class="link-grid gap-4 w-11/12 lg:w-3/6">
    <div class="basis-1/4 grow">
      <DevLink link={{ label: "Resources", href: "/resources" }} />
      <DevLink link={{ label: "Articles", href: "/articles" }} />
    </div>
  </div>
</section> -->

<style>
  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, 1fr);
  }
</style>
