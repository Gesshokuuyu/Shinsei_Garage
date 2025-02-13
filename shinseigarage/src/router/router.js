import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/ShinseiHome.vue';
import ShinseiLoginUI from '@/components/ShinseiLoginUI.vue';

const routes = [
  { path: '/', component: ShinseiLoginUI },
  { path: '/Home', component: Home },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
