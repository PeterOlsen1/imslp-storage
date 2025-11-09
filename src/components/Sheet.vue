<script setup lang="ts">
import { useCurrentUser } from 'vuefire';
import { Button } from '@/components/lib/inputs';
import { updateRecentlyViewed } from '@/scripts/db';
import { Row } from './layouts';
import { ref, type PropType } from 'vue';
import { SheetModal } from '@/components';
import type { Sheet } from '@/types/sheet';

const props = defineProps({
  sheet: {
    type: Object as PropType<Sheet>,
    required: true,
  },
});

const user = useCurrentUser();
const expanded = ref<boolean>(false);

function redirect() {
  updateRecentlyViewed(user.value?.uid || '', props.sheet.id || '');
  window.open(props.sheet.url, '_blank');
}
</script>

<template>
  <SheetModal v-if="expanded" @closed="() => expanded = false" :sheet="props.sheet"/>
  <div
    style="background: var(--tertiary-gradient)"
    class="flex p-4 rounded-md shadow-md gap-6 justify-center"
  >
    <div class="flex flex-col gap-2">
      <div class="font-semibold text-xl poppins">
        {{ props.sheet.title }}
      </div>
      <div class="text-sm italic poppins">
        {{ props.sheet.composer }}
      </div>
    </div>
    <Row class="flex-1 justify-end">
      <Button class="my-auto"
        @click="() => expanded = true"
      >
        Expand
      </Button>
      <Button class="w-max my-auto" @click="redirect"> 
        View Sheet 
      </Button>
    </Row>
  </div>
</template>
