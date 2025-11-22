<script setup lang="ts">
import { Sheet } from '.'
import { Loader } from '@/components/lib'
import type { Sheet as SheetType } from '@/types/sheet'
import { computed, watch, ref } from 'vue'
import { Col, Row } from '@/components/layouts'
import { Arrow } from '@/components/lib/svg'

interface Props {
  sheets: SheetType[]
  filters: String[]
  pageLen: number // will need to worry about changing page length if user is out of bounds
}
const props = defineProps<Props>()

const filteredSheets = computed(() => {
  let result = Array.isArray(props.sheets) ? props.sheets : []
  if (props.filters && props.filters.length) {
    result = result.filter((sheet) => props.filters.includes(sheet.composer))
  }

  return result.slice().sort((a, b) => {
    //@ts-ignore
    const aTime = a.lastAccessed ? a.lastAccessed.toDate().getTime() : 0
    //@ts-ignore
    const bTime = b.lastAccessed ? b.lastAccessed.toDate().getTime() : 0
    return bTime - aTime
  })
})

const pagedSheets = computed(() => {
  const start = pageIdx.value * props.pageLen
  const end = start + props.pageLen
  return filteredSheets.value.slice(start, end)
})

let pageIdx = ref(0)
const pages = computed(() => {
  const out = []
  for (let i = 0; i < filteredSheets.value.length / props.pageLen; i++) {
    out.push(i)
  }
  return out
})

watch([filteredSheets, () => props.pageLen], () => {
  const maxPage = pages.value.length > 0 ? pages.value[pages.value.length - 1] : 0
  if (pageIdx.value > (maxPage || 0)) {
    pageIdx.value = maxPage || 0
  }
})
</script>

<template>
  <div v-if="!props.sheets || props.sheets.length === 0">
    <Loader />
  </div>
  <div v-else>
    <Col gap="4" class="pb-6">
      <div v-for="sheet in pagedSheets" :key="sheet.id">
        <Sheet :sheet="sheet" />
      </div>

      <!-- page selector -->
      <Row class="w-full justify-center">
        <Arrow
          class="cursor-pointer"
          style="transform: scaleX(-1)"
          @click="pageIdx != 0 ? pageIdx-- : (pageIdx = pages[pages.length - 1] || 0)"
        />
        <div
          v-for="page in pages"
          :key="`page-${page}`"
          :class="`cursor-pointer px-2 rounded-full select-none ${page == pageIdx ? 'bg-gray-200' : ''}`"
          @click="pageIdx = page"
        >
          {{ page + 1 }}
        </div>
        <Arrow
          class="cursor-pointer"
          @click="pageIdx != pages[pages.length - 1] ? pageIdx++ : (pageIdx = 0)"
        />
      </Row>
    </Col>
  </div>
</template>
