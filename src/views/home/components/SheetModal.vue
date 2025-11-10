<script setup lang="ts">
import { onMounted, onUnmounted, type PropType, reactive } from 'vue'
import { Subtitle, Italic } from '@/components/ui'
import type { Sheet } from '@/types/sheet'
import { Col, Row } from '@/components/layouts'
import { ViewSheetButton, Button } from '@/components/lib/inputs'
import TextInput from '@/components/lib/inputs/TextInput.vue'
import { fireConfirmation, fireErrorToast, fireSuccessToast } from '@/scripts/alerts'
import { deleteSheet, updateSheet } from '@/scripts/db'
import { useCurrentUser } from 'vuefire'

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

const user = useCurrentUser()
const emit = defineEmits(['closed'])

const form = reactive({
  title: props.sheet.title,
  composer: props.sheet.composer,
  url: props.sheet.url,
})

async function handleUpdate() {
  if (!user.value || !user.value.uid) {
    return
  }

  if (!form.title || !form.composer || !form.url) {
    const missing = []
    if (!form.title) missing.push('Title')
    if (!form.composer) missing.push('Composer')
    if (!form.url) missing.push('Url')

    fireErrorToast({
      text: `Missing required inputs: ${missing.join(', ')}`,
    })
  }

  const res = await updateSheet(user.value?.uid, props.sheet.id || '', {
    ...props.sheet,
    title: form.title,
    composer: form.composer,
    url: form.url,
  })
  if (res) {
    emit('closed')
    fireSuccessToast({
      text: 'Sheet updated successfully',
    })
  } else {
    fireErrorToast({
      text: 'Unexpected error updating sheet. Try again later',
    })
  }
}

async function handleDelete() {
  const res = await fireConfirmation({
    title: 'Delete sheet',
  })

  if (res.isConfirmed) {
    try {
      await deleteSheet(user.value?.uid || '', props.sheet.id || '')
      emit('closed')
      fireSuccessToast({
        text: 'Sheet deleted successfully',
      })
    } catch (err) {
      fireErrorToast({
        text: 'Unexpected error deleting sheet. Try again later',
      })
    }
  }
}
</script>

<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 z-50 grid place-items-center"
    style="background-color: rgba(150, 150, 150, 0.4)"
    @click="() => emit('closed')"
  >
    <Col gap="4" class="w-[100vw] sm:w-[50vw] min-h-[50vh] p-4 bg-white sm:rounded z-51 place-items-start" @click.stop>
      <Row>
        <Col gap="0">
          <Subtitle>
            {{ sheet.title }}
          </Subtitle>
          <Italic>
            {{ sheet.composer }}
          </Italic>
        </Col>
        <div class="flex-1">
          <ViewSheetButton :sheet="sheet" />
        </div>
      </Row>
      <Col gap="4">
        <Col>
          <TextInput v-model="form.title" label="Title" />
          <TextInput v-model="form.composer" label="Composer" />
          <TextInput v-model="form.url" label="URL" type="url" />
        </Col>
        <Row>
          <Row class="flex-1">
            <Button @click="handleUpdate"> Update </Button>
            <Button @click="() => emit('closed')"> Cancel </Button>
          </Row>
          <Button @click="handleDelete"> Delete </Button>
        </Row>
      </Col>
    </Col>
  </div>
</template>
