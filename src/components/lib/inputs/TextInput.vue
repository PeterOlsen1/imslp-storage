<script setup>
defineProps({
  label: {
    type: String,
    required: false,
  },
})

const model = defineModel()
</script>

<template>
  <div>
    <label v-if="label" class="block text-md font-medium mb-1">{{ label }}</label>
    <input
      type="text"
      class="border border-gray-300 rounded-md p-2 w-full outline-none"
      v-bind="$attrs"
      v-model="model"
    />
  </div>
</template>
