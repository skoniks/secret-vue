import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: () => import('../views/StoreView2.vue'),
    },
    {
      path: '/:id',
      name: 'secret',
      component: () => import('../views/OpenView2.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
