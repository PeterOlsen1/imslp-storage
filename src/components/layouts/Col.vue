<script setup>
const props = defineProps({
  gap: {
    required: false,
    default: '2',
    type: String,
  },
})
</script>

<template>
  <div :class="`flex flex-col gap-${props.gap}`">
    <slot></slot>
  </div>
</template>
