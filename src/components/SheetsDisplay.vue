<script setup lang="ts">
//@ts-ignore
import Sheet from './Sheet.vue'
//@ts-ignore
import Loader from './lib/Loader.vue'

defineProps({
  sheets: {
    type: Array as any,
    required: true,
  },
})
</script>

<template>
  <div v-if="sheets == null">
    <Loader />
  </div>
  <div v-for="sheet in sheets" :key="sheet.id">
    <Sheet :title="sheet.title" :composer="sheet.composer" />
  </div>
</template>
