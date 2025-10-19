<script setup>
    import Header from '@/components/Header.vue';
    import AddSheetForm from '@/components/AddSheetForm.vue';
    import Sheet from '@/components/Sheet.vue';
    import { useCurrentUser } from 'vuefire';

    const user = useCurrentUser();
</script>

<template>
    <div class="w-screen min-h-screen flex flex-col align-center overflow-x-hidden">
        <Header />
        <div class="mt-16 mx-auto">
            <div class="font-semibold text-3xl mb-12">
                welcome back, {{ user.displayName.split(' ')[0] }}!
            </div>
            <div class="flex gap-8 w-full">
                <div>
                    <h2 class="text-xl font-semibold mb-4">add new sheet</h2>
                    <AddSheetForm />
                </div>
                <div class="flex flex-col gap-4 flex-1">
                    <h2 class="text-xl font-semibold mb-4">your sheets</h2>
                    <Sheet title="Rach 3" composer="Rachmaninoff" />
                    <Sheet title="Rachmaninoff 3rd piano concerto" composer="Rachmaninoff" />
                </div>
                <div class="flex flex-col gap-4">
                    <h2 class="text-xl font-semibold mb-4">filters</h2>
                </div>
            </div>
        </div>
    </div>
</template>