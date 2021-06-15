import Vue from 'vue';
import Vuex from 'vuex';
import charactersStore from '@/store/charactersStore';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        characters: [],
        charactersState: {
            started: false,
            finished: false,
            errors: [],
        },
        nextUrl: null,
        previousUrl: null,
    },
    getters: {
        showNextBtn(state) {
            return !!state.nextUrl;
        },
        showPreviousBtn(state) {
            return !!state.previousUrl;
        },
    },
    mutations: {
        SET_CHARACTERS(state, payload) {
            state.characters = payload;
        },
        SET_NEXT_URL(state, nextUrl) {
            state.nextUrl = nextUrl;
        },
        SET_PREVIOUS_URL(state, previousUrl) {
            state.previousUrl = previousUrl;
        },
        START_CHARACTER_STATE(state) {
            state.charactersState.started = true;
            state.charactersState.finished = false;
            state.charactersState.errors = [];
        },
        FINISHED_CHARACTER_STATE(state, errors = []) {
            state.charactersState.finished = true;
            state.charactersState.errors = errors;
        },
    },
    actions: {
        fetchCharacters(context, url) {
            context.commit('START_CHARACTER_STATE');

            fetch(url ? url : 'https://swapi.dev/api/people')
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('request failed');
                    }

                    return response.json();
                })
                .then(function (body) {
                    context.commit('SET_CHARACTERS', body.results);
                    context.commit('SET_NEXT_URL', body.next);
                    context.commit('SET_PREVIOUS_URL', body.previous);
                    context.commit('FINISHED_CHARACTER_STATE');
                })
                .catch(function (error) {
                    console.error(error);
                    context.commit('FINISHED_CHARACTER_STATE', [error]);
                });
        },
    },
    modules: {
        charactersStore: charactersStore,
    },
});
