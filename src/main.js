import { createApp, reactive } from 'vue'
import './assets/scss/style.scss'
import { router } from './router';
import * as bootstrap from 'bootstrap';
import App from './App.vue'

export const store = reactive({
      api_base_url: 'http://localhost:8000'
})

createApp(App).use(router).mount('#app')
