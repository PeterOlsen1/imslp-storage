<script setup>
    import { getUserSheetsCollection } from '@/scripts/db';
    import { useCurrentUser, useCollection } from 'vuefire';
    import Sheet from './Sheet.vue';

    const user = useCurrentUser();
    const sheets = useCollection(getUserSheetsCollection(user._rawValue.uid));
</script>

<template>
    <div v-for="sheet in sheets" :key="sheet.id">
        <Sheet :title="sheet.title" :composer="sheet.composer" />
    </div>
</template>