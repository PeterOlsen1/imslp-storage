<script setup>
import { useCurrentUser } from 'vuefire';
import Button from './lib/Button.vue'
import { updateRecentlyViewed } from '@/scripts/db';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  composer: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  }
});

const user = useCurrentUser();

function redirect() {
  updateRecentlyViewed(user.value.uid, props.id);
  window.open(props.url, '_blank');
}
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
      <Button class="w-max my-auto" @click="redirect"> 
        View Sheet 
      </Button>
    </div>
  </div>
</template>
