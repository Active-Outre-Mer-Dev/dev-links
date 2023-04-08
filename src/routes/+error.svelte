<script lang="ts">
  import { page } from "$app/stores";
</script>

<main class="flex items-center flex-col gap-4 justify-center container">
  <div class="text-center">
    <p class="text-base font-semibold text-primary-500">{$page.status}</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{$page.error?.message}</h1>
    <p class="mt-6 text-base leading-7 text-neutral-200">
      Sorry, we couldnt find the page youre looking for.
    </p>
  </div>
  <div>
    <a
      href="/"
      class="bg-primary-200 hover:bg-primary-200/75 px-4 py-2 rounded-full font-semibold text-primary-800"
      >Go back home</a
    >
  </div>
</main>

<style>
  .container {
    height: calc(100vh - 84px);
  }
</style>
