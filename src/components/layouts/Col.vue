<script setup>
import { twMerge } from 'tailwind-merge'
import { useAttrs, computed } from 'vue'

const props = defineProps({
  gap: {
    required: false,
    default: '2',
    type: String,
  },
})

const attrs = useAttrs()
const merged = computed(() => twMerge(`flex flex-col w-full gap-${props.gap}`, attrs.class))
</script>

<template>
  <div :class="merged">
    <slot></slot>
  </div>
</template>
