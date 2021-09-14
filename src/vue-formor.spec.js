import { mount } from '@vue/test-utils';

import Form from './Form.vue';

process.chdir(__dirname);

describe('vue-formor', () => {
  it('Form', () => {
    const wrapper = mount(Form, {});

    expect(wrapper.html()).toMatchSnapshot();
  });
});
