<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

const msgs = {
  required: `This is a required field`,
};

const state = reactive({
  listGroupForm: [
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
  listGroupValdn: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [
      computed(() => state.listGroupForm),
      (row: any, idx: number) => [
        [computed(() => row.parent), string().required(msgs.required)],
        [
          computed(() => row.children),
          (subRow: any, subIdx: number) => [
            [computed(() => subRow.firstField), string().required(msgs.required)],
            [computed(() => subRow.secondField), string().required(msgs.required)],
          ],
        ],
      ],
    ],
  ],
  state,
  'listGroupValdn',
);

schema.validate();
</script>

<template>
  <fieldset>
    <legend>Tabular Form Groups</legend>

    <pre>{{ state.listGroupForm }}</pre>

    <pre>{{ state.listGroupValdn }}</pre>
  </fieldset>
</template>
