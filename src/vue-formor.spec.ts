import { mount } from '@vue/test-utils';

import Form from './fixtures/Form.vue';
import TabularForm from './fixtures/TabularForm.vue';
import DynamicRules from './fixtures/DynamicRules.vue';

process.chdir(__dirname);

describe('vue-formor', () => {
  it('Form', () => {
    const wrapper = mount(Form, {});

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('TabularForm', () => {
    const wrapper = mount(TabularForm, {});

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('DynamicRules', () => {
    const wrapper = mount(DynamicRules, {});

    expect(wrapper.html()).toMatchSnapshot();
  });
});
