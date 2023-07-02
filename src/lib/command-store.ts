import { writable } from "svelte/store";

export function useCommand() {
  const search = writable("");

  return {
    search,

    onReset: () => {
      search.set("");
    }
  };
}
