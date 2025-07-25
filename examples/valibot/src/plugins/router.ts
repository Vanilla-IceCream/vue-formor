import { createWebHistory, createRouter } from 'vue-router';

import routes from 'virtual:vue-routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
