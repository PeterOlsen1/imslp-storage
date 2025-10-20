<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue';

const route = useRoute();
</script>

<template>
  <Header v-if="route.name !== 'index'" />
  <RouterView />
  <Footer />
</template>

<!-- Scoped: styles apply to current component only -->
<style scoped></style>
