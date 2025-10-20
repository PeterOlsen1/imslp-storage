<script setup lang="ts">
import type { Sheet } from '@/types/sheet'

defineProps({
  data: {
    type: Array as () => Sheet[],
    required: true,
  },
})
</script>

<template>
  <div></div>
</template>
