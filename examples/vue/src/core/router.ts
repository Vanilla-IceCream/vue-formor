import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './Home.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/basic-forms', component: () => import('~/modules/basic-forms/Registry.vue') },
    { path: '/dynamic-forms', component: () => import('~/modules/dynamic-forms/Registry.vue') },
    { path: '/tabular-forms', component: () => import('~/modules/tabular-forms/Registry.vue') },
    { path: '/tabular-form-groups', component: () => import('~/modules/tabular-form-groups/Registry.vue') },
    { path: '/custom-schemas', component: () => import('~/modules/custom-schemas/Registry.vue') },
    { path: '/state-management/dependency-injection', component: () => import('~/modules/state-management/dependency-injection/Registry.vue') },
    { path: '/state-management/pinia-integration', component: () => import('~/modules/state-management/pinia-integration/Registry.vue') },
    { path: '/multiple-schemas/multiple-instance', component: () => import('~/modules/multiple-schemas/multiple-instance/Registry.vue') },
    { path: '/multiple-schemas/single-instance', component: () => import('~/modules/multiple-schemas/single-instance/Registry.vue') },
  ],
});

export default router;
