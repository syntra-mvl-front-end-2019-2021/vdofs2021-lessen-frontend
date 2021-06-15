import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/generic',
        name: 'Generic',
        component: function () {
            return import('@/views/Generic.vue');
        },
    },
    {
        path: '/elements',
        name: 'Elements',
        component: function () {
            return import('@/views/Elements.vue');
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
