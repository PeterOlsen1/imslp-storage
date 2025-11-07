<script setup>
    const props = defineProps({
        gap: {
            required: false,
            default: '2',
            type: String,
        },
    });
</script>

<template>
    <div :class="`flex items-center gap-${gap}`">
        <slot></slot>
    </div>
</template>