import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import PageOne from '@/views/PageOne';
import PageTwo from '@/views/PageTwo';
import PageThree from '@/views/PageThree';
import PageFour from '@/views/PageFour';
import PageFive from '@/views/PageFive';
import PageSix from '@/views/PageSix';
import PageSeven from '@/views/PageSeven';
import PageEight from '@/views/PageEight';
import PageNine from '@/views/PageNine';
import PageTen from '@/views/PageTen';
import PageEleven from '@/views/PageEleven';
import PageTwelve from '@/views/PageTwelve';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/page-one',
        name: 'PageOne',
        component: PageOne,
    },
    {
        path: '/page-two',
        name: 'PageTwo',
        component: PageTwo,
    },
    {
        path: '/page-three',
        name: 'PageThree',
        component: PageThree,
    },
    {
        path: '/page-four',
        name: 'PageFour',
        component: PageFour,
    },
    {
        path: '/page-five',
        name: 'PageFive',
        component: PageFive,
    },
    {
        path: '/page-six',
        name: 'PageSix',
        component: PageSix,
    },
    {
        path: '/page-seven',
        name: 'PageSeven',
        component: PageSeven,
    },
    {
        path: '/page-eight',
        name: 'PageEight',
        component: PageEight,
    },
    {
        path: '/page-nine',
        name: 'PageNine',
        component: PageNine,
    },
    {
        path: '/page-ten',
        name: 'PageTen',
        component: PageTen,
    },
    {
        path: '/page-eleven',
        name: 'PageEleven',
        component: PageEleven,
    },
    {
        path: '/page-twelve',
        name: 'PageTwelve',
        component: PageTwelve,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
