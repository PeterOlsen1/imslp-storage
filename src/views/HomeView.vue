<script setup>
    import Header from '@/components/Header.vue';
    import AddSheetForm from '@/components/AddSheetForm.vue';
    import Sheet from '@/components/Sheet.vue';
</script>

<template>
    <div class="w-screen min-h-screen flex flex-col align-center overflow-x-hidden">
        <Header />
        <div class="mt-16 mx-auto">
            <div class="font-semibold text-3xl">
                your sheets
            </div>
            <div class="flex gap-4 w-full">
                <div>
                    <AddSheetForm />
                </div>
                <div class="flex flex-col justify-center  gap-4">
                    <Sheet title="Rach 3" composer="Rachmaninoff" />
                    <Sheet title="Rachmaninoff 3rd piano concerto" composer="Rachmaninoff" />
                </div>
            </div>
        </div>
    </div>
</template>