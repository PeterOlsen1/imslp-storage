<script setup>
    import { defineProps } from 'vue';

    defineProps();
</script>

<template>
  <button
    class="bg-black text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
    v-bind="$attrs"
  >
     <slot></slot>
  </button>
</template>