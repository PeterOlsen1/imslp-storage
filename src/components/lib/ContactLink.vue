<script setup lang="ts">
import { ref } from 'vue'

const nameTextRef = ref<HTMLDivElement | null>(null)
function onOver() {
  if (!nameTextRef?.value) {
    return
  }

  const underline = nameTextRef.value.querySelector<HTMLDivElement>('.underline')!
  const refWidth = nameTextRef.value.getBoundingClientRect().width
  underline.style.width = refWidth + 'px'
}

function onOut() {
  if (!nameTextRef?.value) {
    return
  }

  const underline = nameTextRef.value.querySelector<HTMLDivElement>('.underline')!
  underline.style.width = '0px'
}

defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="cursor-pointer p-1 select-none rounded-md hover:bg-link-hover transition-all duration-200"
  >
    <a
      :href="url"
      target="_blank"
      class="flex gap-2 items-center"
      @mouseover="onOver"
      @mouseout="onOut"
    >
      <img :src="img" :alt="name" width="25" height="20" class="filter invert" />
      <div class="name-text" ref="nameTextRef">
        {{ name }}
        <div class="underline w-0 h-[1px] bg-white transition-all duration-200"></div>
      </div>
    </a>
  </div>
</template>
