import { createRouter, createWebHistory } from "vue-router";
import HomeView from './views/HomeView.vue';
import SingleHomeView from './views/SingleHomeView.vue';
import NotFoundView from './views/NotFoundView.vue';
import SearchResults from './views/SearchResults.vue'


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
        {
            path: '/search',
            name: 'search',
            component: SearchResults
          }
    ]
})

export { router }