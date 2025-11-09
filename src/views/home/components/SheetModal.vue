<script setup lang="ts">
import { onMounted, onUnmounted, type PropType } from 'vue'
import { Subtitle, Italic } from '@/components/ui'
import type { Sheet } from '@/types/sheet'
import { Col, Row } from '@/components/layouts'
import { ViewSheetButton } from '@/components/lib/inputs'

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const props = defineProps({
  sheet: {
    type: Object as PropType<Sheet>,
    required: true,
  },
})

const emit = defineEmits(['closed'])
</script>

<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 z-50 grid place-items-center"
    style="background-color: rgba(150, 150, 150, 0.4)"
    @click="() => emit('closed')"
  >
    <Col class="w-[50vw] h-[50vh] p-4 bg-white rounded z-51 place-items-start" @click.stop>
      <Col>
        <Row>
          <Col gap="0">
            <Subtitle>
              {{ sheet.title }}
            </Subtitle>
            <Small>
              {{ sheet.composer }}
            </Small>
          </Col>
          <div class="flex-1">
            <ViewSheetButton :sheet="sheet" />
          </div>
        </Row>
      </Col>
    </Col>
  </div>
</template>
