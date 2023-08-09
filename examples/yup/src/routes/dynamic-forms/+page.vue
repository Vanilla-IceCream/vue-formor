<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

interface DynamicForms {
  language: string;
  preprocessor: string;
}

const msgs = {
  required: `This is a required field`,
};

const state = reactive({
  myForm: {} as DynamicForms,
  myValdn: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [computed(() => state.myForm.language), string().required(msgs.required)],
    [
      computed(() => state.myForm.preprocessor),
      computed(() =>
        state.myForm.language === 'js' ? string().required(msgs.required) : string().nullable(),
      ),
    ],
  ],
  state,
  'myValdn',
);

const changeLanguage = () => {
  state.myForm.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Dynamic Forms</legend>

    <form>
      <div class="flex gap-2">
        <label for="language">Language:</label>

        <select id="language" v-model="state.myForm.language" @change="changeLanguage">
          <option value="">None</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>

        <div class="text-red-500">{{ state.myValdn['myForm.language'] }}</div>
      </div>

      <div class="flex gap-2">
        <label for="preprocessor">Preprocessor:</label>

        <select
          id="preprocessor"
          v-model="state.myForm.preprocessor"
          :disabled="state.myForm.language !== 'js'"
        >
          <option value="">None</option>
          <option value="ts">TypeScript</option>
        </select>

        <div class="text-red-500">{{ state.myValdn['myForm.preprocessor'] }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.myForm }}</pre>

    <pre>{{ state.myValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.text-red-500 {
  --un-text-opacity: 1;
  color: rgba(239, 68, 68, var(--un-text-opacity));
}
</style>
