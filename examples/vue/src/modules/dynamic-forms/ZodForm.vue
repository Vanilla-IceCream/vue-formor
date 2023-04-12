<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

interface DynamicForms {
  language: string;
  preprocessor: string;
}

const state = reactive({
  zodForm: {} as DynamicForms,
  zodValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
};

const schema = useZodSchema(
  z.object({
    language: z.string({ required_error: msgs.required }).nonempty(msgs.required),
    preprocessor: z
      .string()
      .optional()
      .refine((val) => {
        if (state.zodForm.language === 'js' && !val) return false;
        return true;
      }, msgs.required),
  }),
  toRef(state, 'zodForm'),
  toRef(state, 'zodValdn'),
);

const changeLanguage = () => {
  state.zodForm.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <form>
    <div>
      <label for="language">Language:</label>

      <select id="language" v-model="state.zodForm.language" @change="changeLanguage">
        <option value="">None</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JavaScript</option>
      </select>

      <div class="text-red-500">{{ state.zodValdn.language }}</div>
    </div>

    <div>
      <label for="preprocessor">Preprocessor:</label>

      <select
        id="preprocessor"
        v-model="state.zodForm.preprocessor"
        :disabled="state.zodForm.language !== 'js'"
      >
        <option value="">None</option>
        <option value="ts">TypeScript</option>
      </select>

      <div class="text-red-500">{{ state.zodValdn.preprocessor }}</div>
    </div>

    <button @click="submit">Submit</button>
  </form>

  <pre>{{ state.zodForm }}</pre>

  <pre>{{ state.zodValdn }}</pre>
</template>
