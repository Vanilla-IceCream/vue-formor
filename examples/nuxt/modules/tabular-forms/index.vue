<script lang="ts" setup>
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

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
  errors: {},
});

const schema = useSchema([
  [
    computed(() => state.dataTable), (row, idx) => [
      [computed(() => row.firstField), string().required()],
      [computed(() => row.secondField), string().required()],
    ],
  ],
], state);

schema.validate();
</script>

<template>
  <div>
    <div>Tabular Forms</div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
