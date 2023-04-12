<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

import ZodForm from './ZodForm.vue';

interface DynamicForms {
  language: string;
  preprocessor: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  dynamicForms: {} as DynamicForms,
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [computed(() => state.dynamicForms.language), string().required()],
    [
      computed(() => state.dynamicForms.preprocessor),
      computed(() => state.dynamicForms.language === 'js' ? string().required() : string().nullable()),
    ],
  ],
  state,
);

const changeLanguage = () => {
  state.dynamicForms.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>Dynamic Forms</div>

    <div>
      <div>
        <label for="language">Language:</label>

        <select id="language" v-model="state.dynamicForms.language" @change="changeLanguage">
          <option value="">None</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>

        <div>{{ state.errors['dynamicForms.language'] }}</div>
      </div>

      <div>
        <label for="preprocessor">Preprocessor:</label>

        <select id="preprocessor" v-model="state.dynamicForms.preprocessor"
          :disabled="state.dynamicForms.language !== 'js'">
          <option value="">None</option>
          <option value="ts">TypeScript</option>
        </select>

        <div>{{ state.errors['dynamicForms.preprocessor'] }}</div>
      </div>

      <button @click="submit">Submit</button>
    </div>

    <pre>{{ state.dynamicForms }}</pre>

    <pre>{{ state.errors }}</pre>

    <hr>

    <ZodForm />
  </div>
</template>
