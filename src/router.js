import { createRouter, createWebHistory } from "vue-router";
import HomeView from './views/HomeView.vue';
import SingleHomeView from './views/SingleHomeView.vue';
import NotFoundView from './views/NotFoundView.vue'


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
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        },
    ]
})

export { router }