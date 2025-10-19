<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: false
            },
            composer: {
                type: String,
                required: false
            }
        }
    };
</script>

<template>
    Hello from Sheet.vue!
</template>