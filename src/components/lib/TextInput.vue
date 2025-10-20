<script setup>
defineProps({
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div>
    <label v-if="label" class="block text-md font-medium mb-1">{{ label }}</label>
    <input
      type="text"
      class="border border-gray-300 rounded-md p-2 w-full outline-none"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
