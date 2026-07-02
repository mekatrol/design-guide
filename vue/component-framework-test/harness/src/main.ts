import { createApp } from 'vue';

import App from './App.vue';
import router from '@/router';
import '@ui/css/reset.css';
import '@ui/css/theme.css';
import '@ui/css/core.css';
import './styles.css';

createApp(App).use(router).mount('#app');
