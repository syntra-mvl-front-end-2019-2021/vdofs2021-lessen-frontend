<template>
    <nav :class="{ 'c-nav': true, 'c-nav--open': mobileOpen }">
        <div v-for="(item, label) in items" :key="'level_one_' + label">
            <router-link
                v-if="typeof item === 'string'"
                class="c-nav__item"
                :to="item"
            >
                {{ label }}
            </router-link>
            <Dropdown v-else :items="item" :label="label" />
        </div>
    </nav>
</template>

<script>
import Dropdown from '@/components/Dropdown';
export default {
    name: 'Navigation',
    components: { Dropdown },
    data() {
        return {
            mobileOpen: false,
        };
    },
    props: {
        items: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.$root.$on('hamburger-click', this.toggleMobile);
    },
    destroyed() {
        this.$root.$off('hamburger-click', this.toggleMobile);
    },
    methods: {
        toggleMobile() {
            this.mobileOpen = !this.mobileOpen;

            if (this.mobileOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.c-nav {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    padding-right: 2rem;

    @media screen and (max-width: 600px) {
        position: fixed;
        top: $header-height;
        bottom: 0;
        right: 100%;
        width: 80vw;
        background-color: $header-bg-color;
        padding: 2rem;
        flex-direction: column;
        justify-content: flex-start;
        transition: right 400ms;
        overflow-y: auto;

        &--open {
            right: 20vw;
        }
    }

    &__item {
        display: block;
        line-height: $header-height;
        padding: 0 2rem;
        font-size: 1.6rem;
        color: $nav-color;
        font-weight: bold;
        text-decoration: none;
        background-color: $header-bg-color;

        @media screen and (max-width: 600px) {
            line-height: 3rem;
        }
    }
}
</style>
