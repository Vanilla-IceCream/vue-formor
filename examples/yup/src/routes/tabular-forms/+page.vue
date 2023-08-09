<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

const msgs = {
  required: 'This is a required field',
};

type DataTableItem = { firstField?: string; secondField?: string };

const state = reactive({
  cols: [
    { key: 'firstField', name: 'First Field' },
    { key: 'secondField', name: 'Second Field' },
  ],
  rows: [
    { firstField: 'O', secondField: '' },
    { firstField: '', secondField: 'O' },
    { firstField: 'O', secondField: 'O' },
    { firstField: '', secondField: '' },
  ],

  valdn: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [
      computed(() => state.rows),
      (row: DataTableItem) => [
        [computed(() => row.firstField), string().required(msgs.required)],
        [computed(() => row.secondField), string().required(msgs.required)],
      ],
    ],
  ],
  state,
  'valdn',
);

schema.validate();
</script>

<template>
  <fieldset>
    <legend>Tabular Forms</legend>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.cols" :key="col.key">{{ col.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.rows" :key="rowIdx">
          <td v-for="col in state.cols" :key="`${rowIdx}-${col.key}`" class="h-12">
            <input v-model="row[col.key as keyof typeof row]" />
            <div class="text-red-500">{{ state.valdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre>{{ state.valdn }}</pre>
  </fieldset>
</template>

<style scoped>
.h-12 {
  height: 3rem;
}

.text-red-500 {
  --un-text-opacity: 1;
  color: rgba(239, 68, 68, var(--un-text-opacity));
}
</style>
