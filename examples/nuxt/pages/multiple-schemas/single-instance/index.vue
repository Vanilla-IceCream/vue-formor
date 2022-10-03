<script lang="ts" setup>
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

interface Forms {
  text: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  fooForm: {} as Forms,
  barForm: {} as Forms,
  errors: {},
});

const fooSchema = useSchema([
  [computed(() => state.fooForm.text), string().required()],
], state);

const barSchema = useSchema([
  [computed(() => state.barForm.text), string().required()],
], state);

const fooSubmit = () => {
  barSchema.stop();

  if (fooSchema.validate()) {
    // passed
  }
};

const baeSubmit = () => {
  fooSchema.stop();

  if (barSchema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>Multiple Schemas (Single-instance)</div>

    <div>
      <div>
        <label for="foo">Foo:</label>
        <input id="foo" type="text" v-model="state.fooForm.text">
        <div>{{ state.errors['fooForm.text'] }}</div>
      </div>

      <div>
        <label for="bar">Bar:</label>
        <input id="bar" type="text" v-model="state.barForm.text">
        <div>{{ state.errors['barForm.text'] }}</div>
      </div>

      <button @click="fooSubmit">Foo</button>
      <button @click="baeSubmit">Bar</button>
    </div>

    <div>
      fooForm:
      <pre>{{ state.fooForm }}</pre>
    </div>

    <div>
      barForm:
      <pre>{{ state.barForm }}</pre>
    </div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
