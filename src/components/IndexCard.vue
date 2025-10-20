<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="p-6 rounded-lg shadow-lg index-card text-left lg:max-w-4xl">
    <h1 class="font-semibold text-xl poppins mb-4">{{ title }}</h1>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
