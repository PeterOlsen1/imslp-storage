<script setup lang="ts">
import { Button } from '@/components/lib/inputs'
import { updateRecentlyViewed } from '@/scripts/db'
import type { Sheet } from '@/types/sheet'
import type { PropType } from 'vue'
import { useCurrentUser } from 'vuefire'

const props = defineProps({
  sheet: {
    type: Object as PropType<Sheet>,
    required: true,
  },
})

const user = useCurrentUser()
function redirect() {
  updateRecentlyViewed(user.value?.uid || '', props.sheet.id || '')
  window.open(props.sheet.url, '_blank')
}
</script>

<template>
  <Button class="w-max my-auto" @click="redirect"> View Sheet </Button>
</template>
