<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, array, string, minLength } from 'valibot';

const msgs = { required: 'This is a required field' };

const state = reactive({
  tabularForm: {
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
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useValibotSchema(
  object({
    rows: array(
      object({
        firstField: optional(string([minLength(1, msgs.required)]), ''),
        secondField: optional(string([minLength(1, msgs.required)]), ''),
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
    <legend>Tabular Forms</legend>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.tabularForm.cols" :key="col.key">{{ col.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.tabularForm.rows" :key="rowIdx">
          <td v-for="col in state.tabularForm.cols" :key="`${rowIdx}-${col.key}`" class="h-12">
            <input v-model="row[col.key as keyof typeof row]" />
            <div class="text-red-500">{{ state.tabularValdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre>{{ state.tabularValdn }}</pre>
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
