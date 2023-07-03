<script lang="ts">
  export let value: string;
  const onSelect = () => {
    window.open(value);
  };
</script>

<button
  on:click={onSelect}
  class={`text-gray-800 dark:text-gray-100  p-3 rounded-md 
    cursor-pointer text-base block w-full text-start
    hover:bg-primary-200/30 hover:dark:bg-primary-600/30`}
>
  <slot />
</button>
