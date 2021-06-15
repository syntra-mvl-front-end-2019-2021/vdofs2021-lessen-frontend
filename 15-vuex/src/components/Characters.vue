<template>
    <div class="c-characters">
        <div
            v-if="
                charactersState.finished && charactersState.errors.length === 0
            "
        >
            <div class="c-characters__pagination">
                <button
                    :disabled="!showPreviousBtn"
                    @click="fetchCharacters($store.state.previousUrl)"
                >
                    Previous
                </button>
                <button
                    :disabled="!showNextBtn"
                    @click="fetchCharacters($store.state.nextUrl)"
                >
                    Next
                </button>
            </div>

            <article
                class="c-characters__item"
                v-for="character in characters"
                :key="character.id"
            >
                <h2>{{ character.name }}</h2>
                <p>{{ character.hair_color }}</p>
            </article>
        </div>

        <div v-if="charactersState.started && !charactersState.finished">
            Loading...
        </div>

        <div
            v-if="charactersState.finished && charactersState.errors.length > 0"
        >
            Something went wrong, try turning it off and on again
        </div>
    </div>
</template>

<script>
export default {
    name: 'Characters',
    computed: {
        characters() {
            return this.$store.state.characters;
        },
        charactersState() {
            return this.$store.state.charactersState;
        },
        showNextBtn() {
            return this.$store.getters.showNextBtn;
        },
        showPreviousBtn() {
            return this.$store.getters.showPreviousBtn;
        },
    },
    methods: {
        fetchCharacters(url) {
            this.$store.dispatch('fetchCharacters', url);
        },
    },
};
</script>

<style lang="scss">
.c-characters {
    &__pagination {
        display: flex;
        justify-content: space-between;
        padding: 1rem 3rem;
    }
}
</style>
