<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

type TabularForm = {
  groups: {
    parent?: string;
    children?: {
      firstField?: string;
      secondField?: string;
    }[];
  }[];
};

type TabularValdn = {
  [
    key:
      | `${keyof Pick<TabularForm, 'groups'>}[${number}].${keyof Pick<
          TabularForm['groups'][number],
          'parent'
        >}`
      | `${keyof Pick<TabularForm, 'groups'>}[${number}].${keyof Pick<
          TabularForm['groups'][number],
          'children'
        >}[${number}].${keyof NonNullable<TabularForm['groups'][number]['children']>[number]}`
  ]: string;
};

const state = reactive({
  tabularForm: {
    groups: [
      {
        parent: 'O',
        children: [
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: 'O' },
          { firstField: '', secondField: '' },
        ],
      },
      {
        parent: '',
        children: [
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: '' },
          { firstField: 'O', secondField: 'O' },
        ],
      },
    ],
  } as TabularForm,
  tabularValdn: {} as TabularValdn,
});

const msgs = {
  required: 'This is a required field',
};

const schema = useSchema(
  v.object({
    groups: v.array(
      v.object({
        parent: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required)), ''),
        children: v.array(
          v.object({
            firstField: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required)), ''),
            secondField: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required)), ''),
          })
        ),
      })
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn')
);

schema.validate();
</script>

<template>
  <fieldset>
    <legend>Tabular Form Groups</legend>

    <pre>{{ state.tabularForm }}</pre>
  </fieldset>
</template>
