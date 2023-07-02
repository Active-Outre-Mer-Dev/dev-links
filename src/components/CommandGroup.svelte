<script lang="ts">
  export let heading: string;
</script>

<div class="space-y-1">
  <span class="text-neutral-700 dark:text-neutral-300 text-sm mb-2 inline-block">{heading}</span>
  <slot />
</div>
