import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import BasicForm from './fixtures/BasicForm.vue';
import TabularForm from './fixtures/TabularForm.vue';
import TabularFormGroup from './fixtures/TabularFormGroup.vue';

test('BasicForm', async () => {
  const wrapper = mount(BasicForm, {});

  const email = wrapper.find('#email');
  await email.setValue('text');
  await wrapper.find('button').trigger('click');
  expect(wrapper.html()).toMatchSnapshot();
});

test('TabularForm', () => {
  const wrapper = mount(TabularForm, {});

  expect(wrapper.html()).toMatchSnapshot();
});

test('TabularFormGroup', () => {
  const wrapper = mount(TabularFormGroup, {});

  expect(wrapper.html()).toMatchSnapshot();
});
