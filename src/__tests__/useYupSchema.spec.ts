import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import YupForm from './fixtures/YupForm.vue';

test('YupForm', async () => {
  const wrapper = mount(YupForm, {});

  wrapper.get('[data-testid="email"]').setValue('foo.bar@gmail.com');
  await wrapper.get('[data-testid="sign-in"]').trigger('click');

  expect(wrapper.html()).toMatchInlineSnapshot(`
    "<form>
      <div><label>Email:</label><input type=\\"email\\" data-testid=\\"email\\">
        <div></div>
      </div>
      <div><label>Password:</label><input type=\\"password\\" data-testid=\\"password\\">
        <div>This is a required field</div>
      </div><button type=\\"button\\" data-testid=\\"sign-in\\">Sign in</button>
    </form>"
  `);

  wrapper.unmount();
});
