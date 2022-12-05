import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import BasicForm from './fixtures/BasicForm.vue';

describe('vue-formor', () => {
  it('BasicForm', () => {
    const wrapper = mount(BasicForm, {});

    expect(wrapper.html()).toMatchSnapshot();
  });
});
