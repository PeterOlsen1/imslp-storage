<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full min-h-[80vh] flex flex-col gap-4">
    <div class="p-16">
      <div class="font-bold text-xl">uh oh, something went wrong!</div>
      <div class="text-thin">
        head back <RouterLink to="/" class="underline">to the index</RouterLink> and try again!
      </div>
    </div>
  </div>
</template>
