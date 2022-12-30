<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from '../vue-formor';
import { setLocale, string } from 'yup';

type DataItem = { firstField: string; secondField: string };

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  dataTable: [
    { firstField: 'O', secondField: '' },
    { firstField: '', secondField: 'O' },
    { firstField: 'O', secondField: 'O' },
    { firstField: '', secondField: '' },
  ],
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [
      computed(() => state.dataTable),
      (row: DataItem, idx: number) => [
        [computed(() => row.firstField), string().required()],
        [computed(() => row.secondField), string().required()],
      ],
    ],
  ],
  state,
);

schema.validate();
</script>

<template>
  <div>
    <div>Tabular Forms</div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
