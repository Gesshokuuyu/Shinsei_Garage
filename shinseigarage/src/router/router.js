import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/ShinseiHome.vue';

const routes = [
  { path: '/', component: Home },
  // outras rotas...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
