import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import DgButton from '../components/DgButton.vue';

describe('DgButton', () => {
  it('renders the default label', () => {
    const wrapper = mount(DgButton);

    expect(wrapper.text()).toContain('Framework button');
  });

  it('renders a custom label', () => {
    const wrapper = mount(DgButton, {
      props: {
        label: 'Save changes'
      }
    });

    expect(wrapper.text()).toContain('Save changes');
  });
});
