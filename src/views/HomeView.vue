<script setup>
    import Header from '@/components/Header.vue';
    import AddSheetForm from '@/components/AddSheetForm.vue';
    import SheetsDisplay from '@/components/SheetsDisplay.vue';
    import SheetFilters from '@/components/SheetFilters.vue';
    import { useCurrentUser, useCollection } from 'vuefire';
    import { getUserSheetsCollection } from '@/scripts/db';
    import { watch } from 'vue';

    let sheets;

    const user = useCurrentUser();
    watch(user, (newUser) => {
        if (newUser?.uid) {
            sheets = useCollection(getUserSheetsCollection(newUser.uid));
        }
    });
</script>

<template>
    <div class="w-screen min-h-screen flex flex-col align-center overflow-x-hidden">
        <Header />
        <div class="mt-16 mx-8">
            <div class="font-semibold text-3xl mb-12">
                welcome back{{ user ? ', '+ user.displayName?.split(' ')[0] + '!' : '!' }}
            </div>
            <div class="gap-8 w-full grid grid-cols-1 md:grid-cols-[1fr_4fr]">
                <div class="flex flex-col gap-4 min-w-48">
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"></path>
                            </svg>
                            <h2 class="text-xl font-semibold">add new sheet</h2>
                        </div>
                        <AddSheetForm />
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="filterIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> 
                                <title id="filterIconTitle">Filter</title> 
                                <path d="M10 12.261L4.028 3.972h16L14 12.329V17l-4 3z"/> 
                            </svg>
                            <h2 class="text-xl font-semibold">filters</h2>
                        </div>
                        <SheetFilters />
                    </div>
                </div>
                <div class="flex flex-col gap-4 flex-1 max-w-4xl">
                    <h2 class="text-xl font-semibold mb-4">your sheets</h2>
                    <SheetsDisplay :sheets="sheets" />
                </div>
            </div>
        </div>
    </div>
</template>