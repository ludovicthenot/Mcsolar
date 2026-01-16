import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Import des pages
import SolarSystemPage from '@/pages/SolarSystemPage.vue';

// Configuration des routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'solar-system',
    component: SolarSystemPage,
    meta: { title: 'Système Solaire' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Mise à jour du titre de la page
router.beforeEach((to, from, next) => {
  document.title = to.meta.title 
    ? `${to.meta.title} - McSolar` 
    : 'McSolar';
  next();
});

export default router;
