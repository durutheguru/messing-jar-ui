import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue';
import SignUpView from '@/views/signup/SignUpView.vue';
import guard from './guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        skipAuth: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: {
        skipAuth: true,
      },
    },
    {
      path: '/oauth-service/redirect',
      name: 'oauth-service-redirect',
      component: () => import('@/views/login/OAuthRedirect.vue'),
      meta: {
        skipAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(guard);

export default router;
