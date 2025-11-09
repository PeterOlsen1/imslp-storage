<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-bind="$attrs"
  >
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})
</script>
