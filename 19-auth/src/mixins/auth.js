import store from '@/store';

export default {
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('fetchUserData');

        if (!store.getters.isLoggedIn) {
            next('/login');
            return;
        }
        next();
    },
};
