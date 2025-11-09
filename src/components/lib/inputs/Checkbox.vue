<script setup>
defineProps({
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="flex gap-2">
    <input
      type="checkbox"
      :id="`checkbox-${label}`"
      v-bind="$attrs"
      :checked="modelValue"
      class="cursor-pointer"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="`checkbox-${label}`" class="cursor-pointer">
      {{ label }}
    </label>
  </div>
</template>
