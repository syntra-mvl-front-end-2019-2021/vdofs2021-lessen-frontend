<template>
    <div class="c-subdropdown">
        <span class="c-subdropdown__label" tabindex="0"><slot /></span>
    </div>
</template>

<script>
export default {
    name: 'SubDropdown',
    props: {
        items: {
            type: Object,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped></style>
