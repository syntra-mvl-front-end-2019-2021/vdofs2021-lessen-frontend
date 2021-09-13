<template>
    <div class="app">
        <Header />
        <div :class="{ app__container: true, 'app__container--slide': slide }">
            <main class="app__main">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';
export default {
    data() {
        return {
            slide: false,
        };
    },
    components: { Header },
    created() {
        this.$root.$on('hamburger-click', this.slideContainer);
    },
    destroyed() {
        this.$root.$off('hamburger-click', this.slideContainer);
    },
    methods: {
        slideContainer() {
            this.slide = !this.slide;
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: 10px;
    overflow-x: hidden;
    height: 100vh;
    width: 100vw;
}

.app {
    font-size: 1.4rem;
    &__main {
        padding: $header-height 2rem 0;
        max-width: 75rem;
        margin: 0 auto;
        width: 100%;
    }

    &__container {
        box-sizing: content-box;
        padding: 0;
        width: 100vw;
        transition: padding-left 400ms;

        &--slide {
            @media screen and (max-width: 600px) {
                padding-left: 80vw;
                box-sizing: content-box;
            }
        }
    }
}
</style>
