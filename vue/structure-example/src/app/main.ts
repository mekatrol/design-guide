import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from '@/app/router'
import App from './App.vue'

import '@/assets/main.css'

const APP_MOUNT_SELECTOR = '#app'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount(APP_MOUNT_SELECTOR)
