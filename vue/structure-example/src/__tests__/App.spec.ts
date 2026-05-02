import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

import App from '../app/App.vue'
import { router } from '../app/router'

describe('App', () => {
  it('mounts the application shell', async () => {
    window.localStorage.clear()
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    expect(wrapper.text()).toContain('Structure Example')
    expect(wrapper.text()).toContain('Dashboard')
  })
})
