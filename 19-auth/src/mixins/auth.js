import store from '@/store';

export default {
    beforeRouteEnter(to, from, next) {
        if (!store.getters.isLoggedIn) {
            next('/login');
            return;
        }
        next();
    },
};
