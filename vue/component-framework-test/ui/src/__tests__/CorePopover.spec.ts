import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import CorePopover from '../components/CorePopover.vue';

describe('CorePopover', () => {
  it('renders a native popover surface without owning the trigger element', () => {
    const wrapper = mount(CorePopover, {
      props: {
        contentLabel: 'Passport options',
        id: 'passport-popover'
      },
      slots: {
        default: '<p>Popover content</p>'
      }
    });

    const panel = wrapper.get('[role="dialog"]');

    expect(wrapper.find('button').exists()).toBe(false);
    expect(panel.attributes('id')).toBe('passport-popover');
    expect(panel.attributes('aria-label')).toBe('Passport options');
    expect(panel.attributes('popover')).toBe('auto');
    expect(panel.attributes('data-placement')).toBe('bottom-start');
    expect(panel.text()).toContain('Popover content');
  });

  it('allows callers to choose manual popover mode and placement', () => {
    const wrapper = mount(CorePopover, {
      props: {
        contentLabel: 'Passport options',
        id: 'passport-popover',
        placement: 'top-end',
        popoverMode: 'manual'
      }
    });

    const panel = wrapper.get('[role="dialog"]');

    expect(panel.attributes('popover')).toBe('manual');
    expect(panel.attributes('data-placement')).toBe('top-end');
  });
});
