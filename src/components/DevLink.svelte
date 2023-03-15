<script lang="ts">
  type LinkData = {
    href: string;
    label: string;
  };

  export let link: LinkData;
</script>

<a
  href={link.href}
  target="_blank"
  class={`border border-gray-600 w-full text-center block rounded-md 
bg-gray-800 px-6 py-4 hover:border-indigo-400 duration-200 ease-out hover:text-indigo-300`}
>
  <span class="text-center  text-xl ">{link.label}</span>
</a>
