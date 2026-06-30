import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import CoreButton from '../components/CoreButton.vue';

describe('CoreButton', () => {
  it('renders the default label', () => {
    const wrapper = mount(CoreButton);

    expect(wrapper.text()).toContain('Framework button');
  });

  it('renders a custom label', () => {
    const wrapper = mount(CoreButton, {
      props: {
        label: 'Save changes'
      }
    });

    expect(wrapper.text()).toContain('Save changes');
  });
});
