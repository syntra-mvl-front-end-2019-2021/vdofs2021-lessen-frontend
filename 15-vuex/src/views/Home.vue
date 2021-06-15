<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h3>{{ $store.state.charactersStore.test }}</h3>
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <Characters />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Characters from '@/components/Characters';

export default {
    name: 'Home',
    components: {
        Characters,
        HelloWorld,
    },
    created() {
        this.$store.dispatch('fetchCharacters');
    },
};
</script>
