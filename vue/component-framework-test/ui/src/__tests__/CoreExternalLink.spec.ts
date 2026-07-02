import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import CoreExternalLink from '../components/CoreExternalLink.vue';

describe('CoreExternalLink', () => {
  it('renders slot content inside an external link', () => {
    const wrapper = mount(CoreExternalLink, {
      props: {
        href: 'https://example.com/'
      },
      slots: {
        default: '<span>External content</span>'
      }
    });

    const link = wrapper.get('a');

    expect(link.attributes('href')).toBe('https://example.com/');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.text()).toContain('External content');
  });

  it('uses safe rel defaults for new-window links', () => {
    const wrapper = mount(CoreExternalLink, {
      props: {
        href: 'https://example.com/'
      }
    });

    expect(wrapper.get('a').attributes('rel')).toBe('noopener noreferrer');
  });

  it('allows callers to set a custom target and rel', () => {
    const wrapper = mount(CoreExternalLink, {
      props: {
        href: 'https://example.com/',
        target: '_self',
        rel: 'external'
      }
    });

    const link = wrapper.get('a');

    expect(link.attributes('target')).toBe('_self');
    expect(link.attributes('rel')).toBe('external');
  });
});
