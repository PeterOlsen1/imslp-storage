<script setup lang="ts">
    import { onMounted, onUnmounted, type PropType } from 'vue'
    import type { Sheet } from '@/types/sheet';

    onMounted(() => {
        document.body.style.overflow = 'hidden';
    });

    onUnmounted(() => {
        document.body.style.overflow = '';
    });

    const props = defineProps({
        sheet: {
            type: Object as PropType<Sheet>,
            required: true,
        },
    });

    const emit = defineEmits(['closed'])
</script>

<template>
    <div class="w-screen h-screen fixed top-0 left-0 z-50 grid place-items-center"
        style="background-color: rgba(150, 150, 150, 0.4)"
        @click="() => emit('closed')"
    >
        <Col class="p-24 bg-white rounded z-51"
            @click.stop
        >
            <div>

            </div>
        </Col>
    </div>
</template>