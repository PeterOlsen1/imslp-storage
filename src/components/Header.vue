<script setup>
import Button from './lib/inputs/Button.vue'
import { signOut } from 'firebase/auth'
import { auth } from '@/scripts/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="w-full py-4 flex" style="background: var(--secondary-gradient)">
    <router-link to="/" class="flex pl-8 cursor-pointer items-center">
      <img src="/favicon.png" alt="treble clef" class="h-12 mr-2 sm:mr-4" />
      <span class="text-2xl poppins self-center">
        <span class="font-semibold"> IMSLP </span>
        <br 
          class="sm:hidden"
        />
        Storage
      </span>
    </router-link>
    <div class="text-center poppins text-lg self-center flex pr-8 ml-auto justify-end gap-4">
      <Button
        @click="
          () => {
            signOut(auth)
            router.push('/')
          }
        "
      >
        Log Out
      </Button>
      <Button
      > Profile </Button>  
    </div>
  </div>
</template>
