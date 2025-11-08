<script setup lang="ts">
import { Sheet } from '.';
import { Loader } from './lib';
import type { Sheet as SheetType } from '@/types/sheet';
import { computed } from 'vue';
import { Col } from './layouts';

interface Props {
  sheets: SheetType[],
  filters: String[],
}
const props = defineProps<Props>();

const filteredSheets = computed(() => {
  if (!props.filters || !props.filters.length) return props.sheets;

  return props.sheets.filter(sheet => props.filters.includes(sheet.composer))
})
</script>

<template>
  <div v-if="props.sheets.length === 0">
    <Loader />
  </div>
  <div v-else>
    <Col gap="4">
      <div v-for="sheet in filteredSheets" :key="sheet.id">
        <Sheet :title="sheet.title" :composer="sheet.composer" :url="sheet.url" />
      </div>
    </Col>
  </div>
</template>
