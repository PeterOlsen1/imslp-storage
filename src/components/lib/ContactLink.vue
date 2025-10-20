<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="cursor-pointer p-1 select-none rounded-md hover:bg-link-hover transition-all duration-200"
  >
    <a :href="url" target="_blank" class="flex gap-1">
      <img :src="img" :alt="name" width="22" height="20" class="filter invert" />
      <div>
          {{ name }}
      </div>
    </a>
  </div>
</template>
