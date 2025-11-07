<script setup lang="ts">
//@ts-ignore
import Sheet from './Sheet.vue'
//@ts-ignore
import Loader from './lib/Loader.vue'

const props = defineProps({
  sheets: {
    type: Array as any,
    required: true,
  },
});

</script>

<template>
  <div v-if="props.sheets.length == 0">
    <Loader />
  </div>
  <div v-for="sheet in props.sheets" :key="sheet.id">
    <Sheet :title="sheet.title" :composer="sheet.composer" :url="sheet.url" />
  </div>
</template>
