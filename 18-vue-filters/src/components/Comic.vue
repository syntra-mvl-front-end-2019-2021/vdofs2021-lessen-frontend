<template>
    <article>{{ comic.title }}</article>
</template>

<script>
export default {
    name: 'Comic',
    props: {
        comic: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped></style>
