import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';

import App from '@/app/App.vue';
import { router } from '@/app/router';
import { APP_PRODUCT_NAME } from '@/constants/app.constants';
import { ROUTE_PATHS } from '@/constants/route-paths.constants';

const DASHBOARD_LABEL = 'Dashboard';

describe('App', () => {
  it('mounts the application shell', async () => {
    window.localStorage.clear();
    router.push(ROUTE_PATHS.HOME);
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    expect(wrapper.text()).toContain(APP_PRODUCT_NAME);
    expect(wrapper.text()).toContain(DASHBOARD_LABEL);
  });
});
