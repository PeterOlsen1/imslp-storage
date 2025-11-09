<script setup>
import { useAttrs, computed } from 'vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps({
  gap: {
    required: false,
    default: '2',
    type: String,
  },
})

const attrs = useAttrs()
const merged = computed(() => twMerge(`flex items-center w-full gap-${props.gap}`, attrs.class))
</script>

<template>
  <div :class="merged">
    <slot></slot>
  </div>
</template>
