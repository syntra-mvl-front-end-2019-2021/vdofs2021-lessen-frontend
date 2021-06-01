<template>
    <header class="c-header">
        <router-link
            to="/"
            :class="{
                'c-header__link': true,
                'c-header__link--active': $route.path === '/',
            }"
            >Home</router-link
        >
        |
        <router-link to="/about">About</router-link>
    </header>
</template>

<script>
export default {
    name: 'Header',
    created() {
        console.log(this.$router);
        console.log(this.$route);
    },
};
</script>

<style lang="scss">
.c-header {
    &__link {
        color: green;
        &--active {
            color: goldenrod;
        }
    }
}
</style>
