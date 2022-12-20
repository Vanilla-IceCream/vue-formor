import type { State } from './type';

export const stateSymbol = Symbol('/state-management/dependency-injection');

export const createState = reactive({
  basicForms: {},

  errors: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const state = useState();

  const actions = {
    signIn() {
      console.log('Sign In', state.basicForms);
    },
  };

  return actions;
};

export const useComputeds = () => {
  const state = useState();

  const computeds = {
  };

  return computeds;
};

export default () => provide(stateSymbol, createState);
