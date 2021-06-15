<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button @click="fetchCharacters">Fetch characters</button>
        <Characters />
    </div>
</template>

<script>
import Characters from '@/components/Characters';
export default {
    name: 'AboutPage',
    components: { Characters },
    created() {
        this.fetchCharacters();
    },
    methods: {
        fetchCharacters() {
            this.$store.dispatch('fetchCharacters');
        },
    },
};
</script>
