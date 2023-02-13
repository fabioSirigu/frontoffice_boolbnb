import { createApp } from 'vue'
import './assets/scss/style.scss'
import { router } from './router';
import '../node_modules/bootstrap/js/src/dropdown';
import App from './App.vue'

createApp(App).use(router).mount('#app')
