<script setup lang="ts">
  import type { Sheet } from '@/types/sheet'
  import type { Filter } from '@/types/filter';
  import CheckboxInput from './lib/CheckboxInput.vue';
  import { watch, reactive, effect, defineEmits } from 'vue';

  const props = defineProps({
    data: {
      type: Array as () => Sheet[], //weird typing
      required: true,
    },
    filters: {
      type: Array as () => Filter[],
      required: true,
    }
  });

  const emit = defineEmits(['update']);

  let filters = reactive<Filter[]>([]);

  //update filters on data change
  effect(() => {
    const data = props.data;
    if (!data) return;

    const out = new Set<string>();
    for (const sheet of data) {
      out.add(sheet.composer);
    }

    const newFilters: Filter[] = [];
    for (const filter of out) {
      newFilters.push({
        state: false,
        label: filter
      });
    }

    filters.length = 0;
    filters.push(...newFilters);
  });

  watch(filters, () => {
    emit('update', filters.filter(f => f.state).map(f => f.label));
  });
</script>

<template>
  <div class="font-semibold">
    composer
  </div>
  <div v-for="f in filters" class="flex flex-col gap-2">
    <CheckboxInput :label="f.label" v-model="f.state"/>
  </div>
</template>
