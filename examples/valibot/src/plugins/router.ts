import { createWebHistory, createRouter } from 'vue-router';

import routes from 'virtual:vue-routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,

    {
      path: '/:slug(.*)*',
      component: () => import('~/Error.vue'),
    },
  ],
});

export default router;
