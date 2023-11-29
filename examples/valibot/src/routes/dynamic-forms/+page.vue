<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, string, minLength, custom } from 'valibot';

interface DynamicForms {
  language?: string;
  preprocessor?: string;
}

const state = reactive({
  valibotForm: {} as DynamicForms,
  valibotValdn: {} as Record<keyof DynamicForms, string>,
});

const msgs = {
  required: `This is a required field`,
};

const schema = useValibotSchema(
  object({
    language: optional(string([minLength(1, msgs.required)]), ''),
    preprocessor: optional(
      string([
        /** valibot v0.20- */
        // (input) => {
        //   if (state.valibotForm.language === 'js' && !input) {
        //     return getPipeIssues('custom', msgs.required, input);
        //   }

        //   return getOutput(input);
        // },

        /** valibot v0.21+ */
        custom((input) => state.valibotForm.language === 'js' && !!input, msgs.required),
      ]),
    ),
  }),
  toRef(state, 'valibotForm'),
  toRef(state, 'valibotValdn'),
);

const changeLanguage = () => {
  state.valibotForm.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    console.log('validated data =', state.valibotForm);
  }
};
</script>

<template>
  <fieldset>
    <legend>Dynamic Forms</legend>

    <form>
      <div class="flex gap-2">
        <label for="language">Language:</label>

        <select id="language" v-model="state.valibotForm.language" @change="changeLanguage">
          <option value="">None</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>

        <div class="text-red-500">{{ state.valibotValdn.language }}</div>
      </div>

      <div class="flex gap-2">
        <label for="preprocessor">Preprocessor:</label>

        <select
          id="preprocessor"
          v-model="state.valibotForm.preprocessor"
          :disabled="state.valibotForm.language !== 'js'"
        >
          <option value="">None</option>
          <option value="ts">TypeScript</option>
        </select>

        <div class="text-red-500">{{ state.valibotValdn.preprocessor }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.valibotForm }}</pre>

    <pre>{{ state.valibotValdn }}</pre>
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
