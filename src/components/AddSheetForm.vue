<script setup>
    import TextInput from './lib/TextInput.vue';
    import Button from './lib/Button.vue';
    import { reactive } from 'vue';
    import { useCurrentUser } from 'vuefire';
    import { addUserSheet } from '@/scripts/db';

    const user = useCurrentUser();

    const form = reactive({
        title: '',
        composer: '',
        url: '',
    });

    const handleSubmit = async () => {
        if (!user || !user._rawValue.uid) {
            return;
        }
        const res = await addUserSheet(user._rawValue.uid, form);
        if (!res) {
            console.log('sheet add failed');
        } else {
            form.title = '';
            form.composer = '';
            form.url = '';
        }
    }
</script>

<template>
    <div class="flex flex-col gap-2">
        <TextInput v-model="form.title" label="Title" />
        <TextInput v-model="form.composer" label="Composer" />
        <TextInput v-model="form.url" label="URL" type="url" />
        <Button class="mt-4" @click="handleSubmit">
            Add Sheet
        </Button>
        debug: {{  form.title }}
    </div>
</template>