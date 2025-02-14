import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/ShinseiHome.vue';
import ShinseiLoginUI from '@/components/ShinseiLoginUI.vue';
import ShinseiSiginUI from '@/components/ShinseiSiginUI.vue';

const routes = [
  { path: '/', component: ShinseiLoginUI, name: 'Login' },
  { path: '/Login', component: ShinseiLoginUI },
  { path: '/Signin', component: ShinseiSiginUI },
  { path: '/Home', component: Home },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
