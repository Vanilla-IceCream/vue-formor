import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import TabularForms from '../../../examples/zod/src/routes/tabular-forms/+page.vue';
import TabularFormGroups from '../../../examples/zod/src/routes/tabular-form-groups/+page.vue';

import ZodForm from './fixtures/ZodForm.vue';

test('ZodForm', async () => {
  const wrapper = mount(ZodForm, {});

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

test('ZodForm - TabularForms', async () => {
  const wrapper = mount(TabularForms, {});

  expect(wrapper.html()).toMatchInlineSnapshot(`
    "<fieldset data-v-95a08ccc=\\"\\">
      <legend data-v-95a08ccc=\\"\\">Tabular Forms</legend>
      <table data-v-95a08ccc=\\"\\">
        <thead data-v-95a08ccc=\\"\\">
          <tr data-v-95a08ccc=\\"\\">
            <th data-v-95a08ccc=\\"\\">First Field</th>
            <th data-v-95a08ccc=\\"\\">Second Field</th>
          </tr>
        </thead>
        <tbody data-v-95a08ccc=\\"\\">
          <tr data-v-95a08ccc=\\"\\">
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\"></div>
            </td>
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\">This is a required field</div>
            </td>
          </tr>
          <tr data-v-95a08ccc=\\"\\">
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\">This is a required field</div>
            </td>
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\"></div>
            </td>
          </tr>
          <tr data-v-95a08ccc=\\"\\">
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\"></div>
            </td>
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\"></div>
            </td>
          </tr>
          <tr data-v-95a08ccc=\\"\\">
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\">This is a required field</div>
            </td>
            <td data-v-95a08ccc=\\"\\" class=\\"h-12\\"><input data-v-95a08ccc=\\"\\">
              <div data-v-95a08ccc=\\"\\" class=\\"text-red-500\\">This is a required field</div>
            </td>
          </tr>
        </tbody>
      </table><pre data-v-95a08ccc=\\"\\">{
      \\"rows[0].secondField\\": \\"This is a required field\\",
      \\"rows[1].firstField\\": \\"This is a required field\\",
      \\"rows[3].firstField\\": \\"This is a required field\\",
      \\"rows[3].secondField\\": \\"This is a required field\\"
    }</pre>
    </fieldset>"
  `);

  wrapper.unmount();
});

test('ZodForm - TabularFormGroups', async () => {
  const wrapper = mount(TabularFormGroups, {});

  expect(wrapper.html()).toMatchInlineSnapshot(`
    "<fieldset>
      <legend>Tabular Form Groups</legend><pre>{
      \\"groups\\": [
        {
          \\"parent\\": \\"O\\",
          \\"children\\": [
            {
              \\"firstField\\": \\"O\\",
              \\"secondField\\": \\"\\"
            },
            {
              \\"firstField\\": \\"\\",
              \\"secondField\\": \\"O\\"
            },
            {
              \\"firstField\\": \\"O\\",
              \\"secondField\\": \\"O\\"
            },
            {
              \\"firstField\\": \\"\\",
              \\"secondField\\": \\"\\"
            }
          ]
        },
        {
          \\"parent\\": \\"\\",
          \\"children\\": [
            {
              \\"firstField\\": \\"\\",
              \\"secondField\\": \\"O\\"
            },
            {
              \\"firstField\\": \\"O\\",
              \\"secondField\\": \\"\\"
            },
            {
              \\"firstField\\": \\"\\",
              \\"secondField\\": \\"\\"
            },
            {
              \\"firstField\\": \\"O\\",
              \\"secondField\\": \\"O\\"
            }
          ]
        }
      ]
    }</pre><pre>{
      \\"groups[0].children[0].secondField\\": \\"This is a required field\\",
      \\"groups[0].children[1].firstField\\": \\"This is a required field\\",
      \\"groups[0].children[3].firstField\\": \\"This is a required field\\",
      \\"groups[0].children[3].secondField\\": \\"This is a required field\\",
      \\"groups[1].parent\\": \\"This is a required field\\",
      \\"groups[1].children[0].firstField\\": \\"This is a required field\\",
      \\"groups[1].children[1].secondField\\": \\"This is a required field\\",
      \\"groups[1].children[2].firstField\\": \\"This is a required field\\",
      \\"groups[1].children[2].secondField\\": \\"This is a required field\\"
    }</pre>
    </fieldset>"
  `);

  wrapper.unmount();
});
