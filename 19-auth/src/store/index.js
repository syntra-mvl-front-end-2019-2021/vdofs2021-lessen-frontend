import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        userFetchState: {
            started: false,
            finished: false,
            error: [],
        },
        loginState: {
            started: false,
            finished: false,
            error: [],
        },
        token: window.localStorage.getItem('jwt'),
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
        SET_USER_FETCH_START(state) {
            state.userFetchState = {
                started: true,
                finished: false,
                error: [],
            };
        },
        SET_USER_FETCH_SUCCESS(state) {
            state.userFetchState = {
                started: true,
                finished: true,
                error: [],
            };
        },
        SET_USER_FETCH_ERROR(state, errors) {
            state.userFetchState = {
                started: true,
                finished: true,
                error: errors,
            };
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
        logout(context) {
            context.commit('LOGOUT');
            window.localStorage.removeItem('jwt');
        },
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
                    window.localStorage.setItem('jwt', body.jwt_token);
                    context.commit('SET_USER', body);
                    context.commit('SET_LOGIN_SUCCESS');
                })
                .catch((error) => {
                    context.commit('SET_LOGIN_ERROR', [error]);
                    return context.dispatch('logout');
                });
        },
        fetchUserData(context) {
            if (context.state.token === null || context.state.user) {
                return;
            }

            context.commit('SET_USER_FETCH_START');
            return fetch('http://localhost:8000/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jwt_token: context.state.token }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('could not register');
                    }

                    return response.json();
                })
                .then((body) => {
                    context.commit('SET_USER', body);
                    context.commit('SET_USER_FETCH_SUCCESS');
                })
                .catch((error) => {
                    context.commit('SET_USER_FETCH_ERROR', [error]);
                    return context.dispatch('logout');
                });
        },
    },
    modules: {},
});
