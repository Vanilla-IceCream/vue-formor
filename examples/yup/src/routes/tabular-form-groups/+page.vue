<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, array, string } from 'yup';

const msgs = { required: 'This is a required field' };

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
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useYupSchema(
  object({
    groups: array(
      object({
        parent: string().required(msgs.required),
        children: array(
          object({
            firstField: string().required(msgs.required),
            secondField: string().required(msgs.required),
          }),
        ),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);

schema.validate();
</script>

<template>
  <fieldset>
    <legend>Tabular Form Groups</legend>

    <pre>{{ state.tabularForm }}</pre>

    <pre>{{ state.tabularValdn }}</pre>
  </fieldset>
</template>
