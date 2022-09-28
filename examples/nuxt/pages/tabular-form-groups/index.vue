<script lang="ts" setup>
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  listGroup: [
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
  errors: {},
});

const schema = useSchema([
  [
    computed(() => state.listGroup), (row, idx) => [
      [computed(() => row.parent), string().required()],
      [
        computed(() => row.children), (subRow, subIdx) => [
          [computed(() => subRow.firstField), string().required()],
          [computed(() => subRow.secondField), string().required()],
        ],
      ],
    ],
  ],
], state);

schema.validate();
</script>

<template>
  <div>
    <div>Tabular Form Groups</div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
