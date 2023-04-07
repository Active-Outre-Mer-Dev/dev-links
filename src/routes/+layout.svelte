<script>
  import "./styles.css";
  import "@fontsource/fira-mono";
  import "@fontsource/montserrat";
  import Search from "../components/Search.svelte";
</script>

<div class="bg-neutral-800 text-neutral-100">
  <Search />
  <slot />
  <footer class="py-5 px-5 lg:px-20 flex justify-between border-t border-neutral-700 text-neutral-300">
    <p>Built by AOMDev</p>
    <a title="Github" aria-label="Github page" target="_blank" href="https://github.com/Active-Outre-Mer-Dev">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hover:stroke-neutral-100 duration-200 ease-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
        />
      </svg>
    </a>
  </footer>
</div>
