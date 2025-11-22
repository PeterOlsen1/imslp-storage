<script setup lang="ts">
import type { Sheet } from '@/types/sheet'
import type { Filter } from '@/types/filter'
import { Checkbox } from '@/components/lib/inputs'
import { Row } from '@/components/layouts'
import { watch, reactive, effect } from 'vue'

interface Props {
  data: Sheet[]
  filters: Filter[]
}
const props = defineProps<Props>()

const emit = defineEmits(['update'])

let filters = reactive<Filter[]>([])

//update filters on data change
effect(() => {
  const data = props.data
  if (!data || !data.length) return

  const out = new Set<string>()
  const freqs: Record<string, number> = {}
  for (const sheet of data) {
    out.add(sheet.composer)
    freqs[sheet.composer] = (freqs[sheet.composer] || 0) + 1
  }

  const newFilters: Filter[] = []
  for (const filter of out) {
    newFilters.push({
      state: false,
      label: filter,
      frequency: freqs[filter] || 0,
    })
  }

  filters.length = 0
  filters.push(...newFilters)
})

watch(filters, () => {
  emit(
    'update',
    filters.filter((f) => f.state),
  )
})
</script>

<template>
  <div class="font-semibold">composer</div>
  <div v-for="f in filters" class="flex flex-col gap-2">
    <Row>
      <Checkbox :label="f.label" v-model="f.state" />
      <div class="font-light">({{ f.frequency }})</div>
    </Row>
  </div>
</template>
