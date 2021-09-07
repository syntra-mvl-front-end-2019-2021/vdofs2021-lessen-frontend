<template>
    <div class="app">
        <Header />
        <main class="app__main">
            <router-view />
        </main>
    </div>
</template>

<script>
import Header from '@/components/Header';
export default {
    components: { Header },
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
}

.app {
    font-size: 1.4rem;
    &__main {
        padding: $header-height 2rem 0;
        max-width: 75rem;
        margin: 0 auto;
    }
}
</style>
