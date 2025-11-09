<script setup lang="ts">
import { Button } from '@/components/lib/inputs'
import { Row } from '@/components/layouts'
import { ref, type PropType } from 'vue'
import type { Sheet } from '@/types/sheet'
import { Subtitle, Italic } from '@/components/ui'
import { ViewSheetButton } from '@/components/lib/inputs'
import { SheetModal } from '.'

const props = defineProps({
  sheet: {
    type: Object as PropType<Sheet>,
    required: true,
  },
})

const expanded = ref<boolean>(false)
</script>

<template>
  <SheetModal v-if="expanded" @closed="() => (expanded = false)" :sheet="props.sheet" />
  <div
    style="background: var(--tertiary-gradient)"
    class="flex p-4 rounded-md shadow-md gap-6 justify-center"
  >
    <div class="flex flex-col gap-2">
      <Subtitle class="poppins">
        {{ props.sheet.title }}
      </Subtitle>
      <Italic>
        {{ props.sheet.composer }}
      </Italic>
    </div>
    <Row class="flex-1 justify-end">
      <Button class="my-auto" @click="() => (expanded = true)"> Expand </Button>
      <ViewSheetButton :sheet="sheet" />
    </Row>
  </div>
</template>
