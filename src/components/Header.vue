<script setup>
    import Button from './lib/Button.vue';
</script>

<template>
    <div class="w-full py-4 flex" style="background: var(--secondary-gradient);">
        <router-link to="/" class="flex pl-8 cursor-pointer flex">
            <img src="/favicon.png" alt="treble clef" class="h-12 mr-4" />
            <span class="text-2xl poppins self-center">
                <span class="font-semibold">
                    IMSLP
                </span>
                Storage
            </span>
        </router-link>
        <div class="flex-1 text-center poppins text-lg self-center flex justify-end pr-8 gap-4">
            <Button>
                Log Out
            </Button>
            <Button>
                Profile
            </Button>
        </div>
    </div>
</template>