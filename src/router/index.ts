import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: () => import('../views/StoreView.vue'),
    },
    {
      path: '/secret/:id',
      name: 'secret',
      component: () => import('../views/SecretView.vue'),
    },
  ],
});

export default router;
