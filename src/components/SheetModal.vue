<script setup lang="ts">
    import { onMounted, onUnmounted, type PropType } from 'vue';
    import { Subtitle, Italic } from './ui';
    import type { Sheet } from '@/types/sheet';
    import { Col } from './layouts';

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
        <Col class="p-24 bg-white rounded z-51 place-items-start"
            @click.stop
        >
            <Col gap="0">
                <Subtitle>
                    {{ sheet.title }}
                </Subtitle>
                <Small>
                    {{ sheet.composer }}
                </Small>
            </Col>
        </Col>
    </div>
</template>