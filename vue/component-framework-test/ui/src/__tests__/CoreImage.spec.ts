import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import CoreImage from '../components/CoreImage.vue';

describe('CoreImage', () => {
  it('renders a non-clickable image', () => {
    const wrapper = mount(CoreImage, {
      props: {
        src: '/test-image.svg',
        alt: 'Test image'
      }
    });

    const image = wrapper.get('img');

    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.find('button').exists()).toBe(false);
    expect(image.attributes('src')).toBe('/test-image.svg');
    expect(image.attributes('alt')).toBe('Test image');
  });

  it('passes through optional dimensions', () => {
    const wrapper = mount(CoreImage, {
      props: {
        src: '/test-image.svg',
        alt: 'Test image',
        width: 240,
        height: 120
      }
    });

    const image = wrapper.get('img');

    expect(image.attributes('width')).toBe('240');
    expect(image.attributes('height')).toBe('120');
  });
});
