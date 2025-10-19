<script setup>
    import TextInput from './lib/TextInput.vue';
    import Button from './lib/Button.vue';
    import { reactive } from 'vue';

    const form = reactive({
        title: '',
        composer: '',
        url: '',
    });
</script>

<template>
    <div class="flex flex-col gap-2">
        <TextInput v-model="form.title" label="Title" />
        <TextInput v-model="form.composer" label="Composer" />
        <TextInput v-model="form.url" label="URL" type="url" />
        <Button class="mt-4">
            Add Sheet
        </Button>
        debug: {{  form.title }}
    </div>
</template>