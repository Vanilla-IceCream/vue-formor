<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { withDefault, object, array, string, minLength } from 'valibot';

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

const schema = useValibotSchema(
  object({
    groups: array(
      object({
        parent: withDefault(string([minLength(1, msgs.required)]), ''),
        children: array(
          object({
            firstField: withDefault(string([minLength(1, msgs.required)]), ''),
            secondField: withDefault(string([minLength(1, msgs.required)]), ''),
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
