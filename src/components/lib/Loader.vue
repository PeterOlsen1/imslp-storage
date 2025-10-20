<script setup>
defineProps()
</script>

<template>
  <div class="w-full h-full flex justify-center items-center" v-bind="$attrs">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid rgba(159, 159, 159, 0.195);
  border-right-color: rgb(0, 0, 0);
  animation: l2 1s infinite linear;
}
@keyframes l2 {
  to {
    transform: rotate(1turn);
  }
}
</style>
