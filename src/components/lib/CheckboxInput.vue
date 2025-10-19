<script setup>
    defineProps({
        label: {
            type: String,
            required: false,
        },
        modelValue: {
            type: Boolean,
            required: true,
        },
    });
</script>

<template>
    <div>
        <input type="checkbox" v-bind="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <div>
            hello
        </div>
    </div>
</template>