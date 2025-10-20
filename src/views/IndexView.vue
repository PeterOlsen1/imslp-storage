<script setup lang="ts">
//@ts-ignore
import GoogleLogin from '@/components/GoogleLogin.vue'
//@ts-ignore
import IndexCard from '@/components/IndexCard.vue'
import { ref } from 'vue'

const containerHeight = 18

const scrollToDiv = ref<HTMLElement | null>(null)
const scrollDown = () => {
  if (typeof window === 'undefined') return

  if (scrollToDiv?.value) {
    scrollToDiv.value.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<!-- dynamically set classes with :class="{javascript}" -->
<template>
  <div :class="`w-screen min-h-screen flex justify-center flex-col align-center overflow-x-hidden`">
    <!-- top card -->
    <div class="flex justify-center gap-2 sm:gap-24 flex-col sm:flex-row mt-[16vh] mb-[16vh]">
      <!-- left -->
      <div
        class="text-center text-5xl flex items-center"
        :style="{ height: containerHeight + 'rem' }"
      >
        <div class="flex flex-col justify-center">
          <span class="font-bold">IMSLP</span>
          <span class="font-light">Storage</span>
        </div>
      </div>
      <!-- divider -->
      <div :class="`h-${containerHeight} w-[1px] bg-black hidden sm:block`"></div>

      <!-- right -->
      <div :class="`flex flex-col text-xl justify-center text-center h-${containerHeight}`">
        <img
          src="/favicon.png"
          alt="treble clef"
          :style="{ height: containerHeight - 4 + 'rem' }"
          class="relative hidden sm:block sm:left-[-3rem]"
        />
      </div>
    </div>

    <!-- middle banner -->
    <div
      class="text-center w-full pt-28 pb-22 gap-4 text-4xl font-800 flex flex-col justify-center items-center"
      style="background: var(--secondary-gradient)"
    >
      <div class="poppins color-[#111111]">Reduce the tabs, store your music in one place.</div>
      <div>
        <button @click="scrollDown" class="mt-6 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 mx-auto text-black animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Info text -->
    <div class="lg:mx-16 my-42 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <IndexCard title="why us?">
        <p>
          IMSLP Storage allows musicians to aggregate and manage their sheet music collections from
          IMSLP in one convenient location.
          <br /><br />
          Gone are the days of juggling countless browser tabs; with IMSLP Storage, you can easily
          store, organize, and access your favorite scores all in one place.
        </p>
      </IndexCard>
      <IndexCard title="features">
        <ul class="list-disc list-inside text-left">
          <li>One-click Google Sign-In for seamless access.</li>
          <li>Store and organize your IMSLP sheet music collection.</li>
          <li>User-friendly interface for easy navigation.</li>
          <li>Access your music from any device, anytime.</li>
        </ul>
      </IndexCard>
    </div>
    <div
      class="py-48 flex justify-center items-center flex-col gap-8"
      style="background: var(--tertiary-gradient)"
      ref="scrollToDiv"
    >
      <div class="text-3xl poppins">Sign in with Google to get started</div>
      <GoogleLogin />
    </div>
  </div>
</template>
