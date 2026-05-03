import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { router } from '@/app/router';
import { configureAuthTransport, useAuthService } from '@/services/auth.service';
import App from './App.vue';

import '@/assets/main.css';

const APP_MOUNT_SELECTOR = '#app';

const app = createApp(App);

app.use(createPinia());
configureAuthTransport();
void useAuthService().loadStorageToken();
app.use(router);

app.mount(APP_MOUNT_SELECTOR);
