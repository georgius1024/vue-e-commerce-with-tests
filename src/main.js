import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@fontsource/roboto"
import '@/main.scss'
import 'bootstrap'
import router from './router'
import App from './App.vue'
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
