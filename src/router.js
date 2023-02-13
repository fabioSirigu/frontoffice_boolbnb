import { createRouter, createWebHistory } from "vue-router";
import HomeView from './views/HomeView.vue';
import SingleHomeView from './views/SingleHomeView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homes',
            component: HomeView
        },
        {
            path: '/homes/:slug',
            name: 'single-home',
            component: SingleHomeView
        },
    ]
})

export { router }