<script setup lang="ts">
import { ref } from 'vue'
import ContactLink from './lib/ContactLink.vue'

const personalSiteRef = <HTMLDivElement | null>ref(null)
</script>

<template>
  <div
    class="w-screen text-white pb-16 pt-12 px-16 flex justify-center"
    style="background: var(--footer-gradient)"
  >
    <!-- left -->
    <div class="w-full flex flex-col gap-2">
      <div class="w-full">
        <span class="font-bold"> IMSP </span>
        storage
      </div>
      <div>
        <div>Developed by Peter Olsen</div>
        <div class="font-thin">CSCI 5117, Fall 2025</div>
      </div>
    </div>
    <!-- right -->
    <div class="w-full flex flex-col gap-2">
      <span class="font-bold"> Contact </span>
      <div class="font-thin flex gap-2 items-center">
        <ContactLink
          name="Github"
          url="https://github.com/PeterOlsen1"
          img="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        />
        <div>|</div>
        <div>Github</div>
      </div>
    </div>
  </div>
</template>
