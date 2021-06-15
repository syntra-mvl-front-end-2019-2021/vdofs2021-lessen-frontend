<template>
    <div class="c-hero">
        <div class="c-hero__content">
            <h1 class="c-hero__title">Welcome to Theory</h1>
            <p class="c-hero__lead">
                A free responsive HTML5 website template by TEMPLATED.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hero',
};
</script>

<style lang="scss">
@import '@/assets/styles/imports/variables';

.c-hero {
    height: 400px;
    background-image: url('../assets/images/banner.jpg');
    background-size: cover;
    background-position: center 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.5em solid $light-blue;

    &__content {
        color: $white;
        text-align: center;
    }

    &__title {
        font-size: 5rem;
        font-weight: 100;
        padding-bottom: 2.5rem;
    }

    &__lead {
        font-size: 1.5rem;
        font-weight: 100;
    }
}
</style>
