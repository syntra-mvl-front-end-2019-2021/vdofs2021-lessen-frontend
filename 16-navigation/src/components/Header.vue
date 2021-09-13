<template>
    <header :class="{ 'c-header': true, 'c-header--hide': scrollDown }">
        <div class="c-header__logo">
            <img src="@/assets/logo.png" alt="logo" />
        </div>

        <Navigation :items="items" />
        <button
            class="c-header__burger"
            @click="$root.$emit('hamburger-click')"
        >
            <span></span><span></span><span></span>
        </button>
    </header>
</template>

<script>
import Navigation from '@/components/Navigation';
export default {
    name: 'Header',
    components: { Navigation },
    created() {
        window.addEventListener('scroll', this.scrollWindow);
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollWindow);
    },
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
            scrollPos: 0,
            scrollDown: false,
            delay: 75,
        };
    },
    methods: {
        scrollWindow() {
            const curScrollPos = window.scrollY;
            if (curScrollPos > this.scrollPos + this.delay) {
                this.scrollDown = true;
                this.scrollPos = curScrollPos;
            } else if (curScrollPos < this.scrollPos - this.delay) {
                this.scrollDown = false;
                this.scrollPos = curScrollPos;
            }
        },
    },
    watch: {
        scrollDown() {
            this.$root.$emit('close-dropdown');
        },
        '$route.path': function (path) {
            console.log(path);
            this.$root.$emit('close-dropdown');
        },
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
    transition: top 300ms ease-in-out;

    &--hide {
        top: -$header-height;
    }

    &__logo {
        height: 100%;
        padding: 0 1rem;

        img {
            display: block;
            height: 100%;
            width: auto;
        }
    }

    &__burger {
        display: none;
        height: $header-height;
        width: $header-height;
        background-color: $header-bg-color;
        border: none;
        position: relative;
        cursor: pointer;

        span {
            width: calc(100% - 2rem);
            position: absolute;
            height: 4px;
            background-color: $nav-color;
            left: 1rem;
            top: 2rem;
        }

        span:nth-child(2) {
            top: 50%;
            margin-top: -2px;
        }

        span:nth-child(3) {
            top: unset;
            bottom: 2rem;
            margin-top: -2px;
        }

        @media screen and (max-width: 600px) {
            display: block;
        }
    }
}
</style>
