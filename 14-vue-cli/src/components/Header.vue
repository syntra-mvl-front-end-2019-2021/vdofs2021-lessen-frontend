<template>
    <header
        :class="{ 'c-header': true, 'c-header--home': $route.path === '/' }"
    >
        <div class="c-header__content">
            <router-link to="/" class="c-header__logo">Theory</router-link>
            <nav>
                <router-link
                    v-for="link in links"
                    :key="link.label"
                    :to="link.path"
                    :class="{
                        'c-header__link': true,
                        'c-header__link--active': $route.path === link.path,
                    }"
                >
                    {{ link.label }}
                </router-link>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            links: [
                { label: 'Home', path: '/' },
                { label: 'Generic', path: '/generic' },
                { label: 'Elements', path: '/elements' },
            ],
        };
    },
};
</script>

<style lang="scss">
@import '@/assets/styles/imports/variables';

.c-header {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;

    &__content {
        @extend %container;
        display: flex;
        justify-content: space-between;
    }

    &__link {
        color: $white;
        text-decoration: none;
    }
}
</style>
