<script setup>
import Button from './lib/Button.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  composer: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    style="background: var(--tertiary-gradient)"
    class="flex p-4 rounded-md shadow-md gap-6 justify-center"
  >
    <div class="flex flex-col gap-2">
      <div class="font-semibold text-xl poppins">
        {{ title }}
      </div>
      <div class="text-sm italic poppins">
        {{ composer }}
      </div>
    </div>
    <div class="flex-1 flex justify-end">
      <Button class="w-max my-auto"> View Sheet </Button>
    </div>
  </div>
</template>
