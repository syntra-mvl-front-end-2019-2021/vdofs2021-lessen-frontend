<template>
    <header class="c-header">
        <div class="c-header__logo">
            <img src="@/assets/logo.png" alt="logo" />
        </div>

        <Navigation :items="items" />
    </header>
</template>

<script>
import Navigation from '@/components/Navigation';
export default {
    name: 'Header',
    components: { Navigation },
    data() {
        return {
            items: {
                'Page One': '/page-one',
                Other: {
                    'Page Two': '/page-two',
                    'Page Three': '/page-three',
                    'Page Four': '/page-four',
                    'More Other': {
                        'Page Nine': '/page-nine',
                        'Page Ten': '/page-ten',
                        'Page Eleven': '/page-eleven',
                        'Page Twelve': '/page-twelve',
                    },
                },
                More: {
                    'Page Five': '/page-five',
                    'Page Six': '/page-six',
                    'Page Seven': '/page-seven',
                    'Page Eight': '/page-eight',
                    'Page Nine': '/page-nine',
                },
            },
        };
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.c-header {
    background-color: $header-bg-color;
    height: $header-height;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;

    &__logo {
        height: 100%;
        padding: 0 1rem;

        img {
            display: block;
            height: 100%;
            width: auto;
        }
    }
}
</style>
