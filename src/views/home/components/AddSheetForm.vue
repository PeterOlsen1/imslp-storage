<script setup>
import { Button, TextInput } from '@/components/lib/inputs'
import { reactive } from 'vue'
import { useCurrentUser } from 'vuefire'
import { addUserSheet } from '@/scripts/db'
import { fireErrorToast, fireSuccessToast } from '@/scripts/alerts'

const user = useCurrentUser()

const form = reactive({
  title: '',
  composer: '',
  url: '',
})

const handleSubmit = async () => {
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

  const res = await addUserSheet(user.value.uid, { ...form })
  if (!res) {
    fireErrorToast({
      text: 'Unexpected error adding sheet. Try again later',
    })
  } else {
    form.title = ''
    form.composer = ''
    form.url = ''
    fireSuccessToast({
      text: 'Sheet added successfully',
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <TextInput v-model="form.title" label="Title" />
    <TextInput v-model="form.composer" label="Composer" />
    <TextInput v-model="form.url" label="URL" type="url" @keyup.enter="handleSubmit" />
    <Button class="mt-4" @click="handleSubmit"> Add Sheet </Button>
  </div>
</template>
