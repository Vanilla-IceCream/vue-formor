<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

interface TabularFormRow {
  firstField?: string;
  secondField?: string;
}

const state = reactive({
  tabularForm: {
    cols: [
      { key: 'firstField', name: 'First Field' },
      { key: 'secondField', name: 'Second Field' },
    ],
    rows: [
      { firstField: 'O' },
      { secondField: 'O' },
      { firstField: 'O', secondField: 'O' },
      {},
    ] as TabularFormRow[],
  },
  tabularValdn: {} as Record<string, string>,
});

const msgs = {
  required: 'This is a required field',
};

const schema = useSchema(
  v.object({
    rows: v.array(
      v.object({
        firstField: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required)), ''),
        secondField: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required)), ''),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);

const add = () => {
  state.tabularForm.rows = [{}, ...state.tabularForm.rows];
};

const remove = (rowIdx: number) => {
  const arr = [...state.tabularForm.rows];
  arr.splice(rowIdx, 1);
  state.tabularForm.rows = arr;
};

const submit = () => {
  if (schema.validate()) {
    console.log('validated data =', state.tabularForm);
  }
};
</script>

<template>
  <fieldset>
    <legend>Tabular Forms</legend>

    <button type="button" @click="add">Add</button>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.tabularForm.cols" :key="col.key">
            {{ col.name }}
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.tabularForm.rows" :key="rowIdx">
          <td v-for="col in state.tabularForm.cols" :key="`${rowIdx}-${col.key}`" class="h-12">
            <input v-model="row[col.key as keyof typeof row]" />
            <div class="text-red-500">{{ state.tabularValdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>

          <td>
            <button v-if="state.tabularForm.rows?.length > 1" type="button" @click="remove(rowIdx)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button type="button" @click="submit">Submit</button>

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
