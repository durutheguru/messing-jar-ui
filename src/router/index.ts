import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/main/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue';
import SignUpView from '@/views/signup/SignUpView.vue';
import guard from './guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/main/dashboard/Dashboard.vue'),
          meta: {
            skipAuth: true,
          },
        },

        {
          path: 'chat',
          alias: ['chat/:username'],
          name: 'chat',
          component: () => import('@/views/main/chat/UserChat.vue'),
        },

        {
          path: 'group',
          alias: ['group/:groupId'],
          name: 'group',
          component: () => import('@/views/main/chat/GroupChat.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/main/settings/Settings.vue'),
        }
      ]
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
// router.afterEach(notificationListener);

export default router;
