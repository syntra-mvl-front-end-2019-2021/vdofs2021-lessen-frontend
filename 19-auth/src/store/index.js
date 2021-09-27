import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginState: {
            started: false,
            finished: false,
            error: [],
        },
        token: null,
        user: null,
    },
    getters: {
        isLoggedIn(state) {
            return state.user !== null;
        },
    },
    mutations: {
        LOGOUT(state) {
            state.user = null;
            state.token = null;
        },
        SET_LOGIN_STATE(state, loginState) {
            state.loginState = loginState;
        },
        SET_LOGIN_START(state) {
            state.loginState = {
                started: true,
                finished: false,
                error: [],
            };
        },
        SET_LOGIN_SUCCESS(state) {
            state.loginState = {
                started: true,
                finished: true,
                error: [],
            };
        },
        SET_LOGIN_ERROR(state, errors) {
            state.loginState = {
                started: true,
                finished: true,
                error: errors,
            };
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
    },
    actions: {
        login(context, data) {
            context.commit('SET_LOGIN_START');
            return fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('could not register');
                    }

                    return response.json();
                })
                .then((body) => {
                    context.commit('SET_TOKEN', body.jwt_token);
                    context.commit('SET_USER', body);
                    context.commit('SET_LOGIN_SUCCESS');
                })
                .catch((error) => {
                    context.commit('SET_LOGIN_ERROR', [error]);
                    context.commit('LOGOUT');
                });
        },
    },
    modules: {},
});
