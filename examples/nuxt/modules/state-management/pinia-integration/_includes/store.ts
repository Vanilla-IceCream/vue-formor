import { State } from './type';

export const useStore = defineStore('/state-management/pinia-integration', {
  state: (): State => ({
    basicForms: {},

    errors: {},
  }),

  getters: {
  },

  actions: {
    signIn() {
      console.log('Sign In', this.basicForms);
    },
  },
});
