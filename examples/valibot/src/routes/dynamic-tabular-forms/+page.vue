<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

type TabularForm = {
  rows: TabularFormRow[];
};

type TabularValdn = Record<
  keyof TabularForm | `${keyof Pick<TabularForm, 'rows'>}[${number}].${keyof TabularFormRow}`,
  string
>;

type TabularFormRow = {
  fieldsEnabled?: boolean;
  firstField?: string;
  secondField?: string;
};

const state = reactive({
  cols: [
    { key: 'fieldsEnabled', name: 'Fields Enabled' },
    { key: 'firstField', name: 'First Field' },
    { key: 'secondField', name: 'Second Field' },
  ] as { key: keyof TabularFormRow; name: string }[],
  tabularForm: {
    rows: [{}, {}, {}],
  } as TabularForm,
  tabularValdn: {} as TabularValdn,
});

const msgs = {
  required: 'This is a required field',
};

const schema = useSchema(
  v.object({
    rows: v.pipe(
      v.array(
        v.pipe(
          v.object({
            fieldsEnabled: v.nullish(v.boolean()),
            firstField: v.nullish(v.string()),
            secondField: v.nullish(v.string()),
          }),
          v.forward(
            v.check(({ fieldsEnabled, firstField }) => {
              if (fieldsEnabled) return !!firstField;
              return true;
            }, msgs.required),
            ['firstField']
          ),
          v.forward(
            v.check(({ fieldsEnabled, secondField }) => {
              if (fieldsEnabled) return !!secondField;
              return true;
            }, msgs.required),
            ['secondField']
          )
        )
      ),
      v.check((input) => input.some((item) => item.fieldsEnabled), 'Enable at least one row')
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn')
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
    <legend>Dynamic Tabular Forms</legend>

    <button type="button" @click="add">Add</button>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.cols" :key="col.key">
            {{ col.name }}
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.tabularForm.rows" :key="rowIdx">
          <td v-for="col in state.cols" :key="`${rowIdx}-${col.key}`" class="h-12">
            <template v-if="col.key === 'fieldsEnabled'">
              <input v-model="row.fieldsEnabled" type="checkbox" />
              <div class="text-red-500">{{ state.tabularValdn.rows }}</div>
            </template>

            <template v-else-if="col.key === 'firstField'">
              <input v-model="row.firstField" />
              <div class="text-red-500">{{ state.tabularValdn[`rows[${rowIdx}].firstField`] }}</div>
            </template>

            <template v-else-if="col.key === 'secondField'">
              <input v-model="row.secondField" />
              <div class="text-red-500">
                {{ state.tabularValdn[`rows[${rowIdx}].secondField`] }}
              </div>
            </template>
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
