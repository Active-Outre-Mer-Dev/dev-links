<script lang="ts">
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import { spring } from "svelte/motion";

  let progress = spring(0);
  let intervalId: NodeJS.Timer;
  let timeoutId: NodeJS.Timer;

  beforeNavigate(() => {
    clearTimeout(timeoutId);
    intervalId = setInterval(() => {
      if ($progress >= 85) return;
      const randomUpdate = Math.floor(Math.random() * 50);
      if ($progress + randomUpdate >= 80) {
        progress.update(n => n + 10);
      } else {
        progress.update(n => n + randomUpdate);
      }
    }, 500);
  });

  afterNavigate(() => {
    progress.set(100);
    clearInterval(intervalId);
    timeoutId = setTimeout(() => {
      progress.set(0, { hard: true });
    }, 500);
  });
</script>

<div style="width:{$progress}%" class="h-1 fixed z-[200] top-0 left-0 bg-primary-600 dark:bg-primary-400" />
