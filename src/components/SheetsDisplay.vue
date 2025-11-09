<script setup lang="ts">
import { Sheet } from '.';
import { Loader } from './lib';
import type { Sheet as SheetType } from '@/types/sheet';
import { computed, effect, watch, ref } from 'vue';
import { Col, Row } from './layouts';
import { Arrow } from './lib/svg';

interface Props {
  sheets: SheetType[],
  filters: String[],
  pageLen: number, // will need to worry about changing page length if user is out of bounds
}
const props = defineProps<Props>();

const filteredSheets = computed(() => {
  if (!props.filters || !props.filters.length) return props.sheets;

  return props.sheets.filter(sheet => props.filters.includes(sheet.composer))
});

const pagedSheets = computed(() => {
  const start = pageIdx.value * props.pageLen;
  const end = start + props.pageLen;
  return filteredSheets.value.slice(start, end);
});

let pageIdx = ref(0);
const pages = computed(() => {
  const out = [];
  for (let i = 0; i < (filteredSheets.value.length / props.pageLen); i++) {
    out.push(i);
  }
  return out;
})

watch([filteredSheets, () => props.pageLen], () => {
  const maxPage = pages.value.length > 0 ? pages.value[pages.value.length - 1] : 0;
  if (pageIdx.value > maxPage) {
    pageIdx.value = maxPage;
  }
});
</script>

<template>
  <div v-if="!props.sheets || props.sheets.length === 0">
    <Loader />
  </div>
  <div v-else>
    <Col gap="4" class="pb-6">
      <div v-for="sheet in pagedSheets" :key="sheet.id">
        <Sheet :title="sheet.title" :composer="sheet.composer" :url="sheet.url" />
      </div>

      <!-- page selector -->
      <Row class="w-full justify-center">
        <Arrow class="cursor-pointer" style="transform: scaleX(-1)"
          @click="pageIdx != 0 ? pageIdx-- : pageIdx = pages[pages.length - 1]"
        />
          <div v-for="page in pages" :key="`page-${page}`" 
            :class="`cursor-pointer px-2 rounded-full select-none ${page == pageIdx ? 'bg-gray-200' : ''}`"
            @click="pageIdx = page"
          >
            {{ page + 1 }}
          </div>
        <Arrow class="cursor-pointer"
          @click="pageIdx != pages[pages.length - 1] ? pageIdx++ : pageIdx = 0"
        />
      </Row>
    </Col>
  </div>
</template>
