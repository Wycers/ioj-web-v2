import Vue from 'vue';
import VueRouter from 'vue-router';
import Guards from './guards';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/p/',
    name: 'problemList',
    component: () => import('@/views/problems/index.vue'),
  },
  {
    path: '/p/:pid',
    name: 'problem',
    component: () => import('@/views/problems/detail.vue'),
  },
  {
    path: '/p/:pid/ranklist',
    name: 'problemRank',
    component: () => import('@/views/problems/ranklist.vue'),
  },
  // {
  //   path: '/p/:pid/discussion',
  //   name: 'problemDiscussion',
  //   component: () => import('@/views/problems/discussion.vue'),
  // },
  {
    path: '/c',
    name: 'Problem',
    component: () =>
      import(/* webpackChunkName: "contest" */ '@/views/contests/index.vue'),
  },
  {
    path: '/u',
    component: () => import(`@/layouts/Account.vue`),
    hidden: true,
    children: [
      {
        path: 'signin',
        component: () => import('@/views/users/Signin.vue'),
        name: 'signin',
      },
      {
        path: 'signup',
        component: () => import('@/views/users/Signup.vue'),
        name: 'signup',
      },
      {
        path: ':uid',
        component: () => import('@/views/users/Profile.vue'),
        name: 'profile',
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/u/preference',
    component: () => import(`@/layouts/Account.vue`),
    children: [
      {
        path: '',
        component: () => import('@/views/users/Preference.vue'),
        name: 'preference',
      },
    ],
  },
  {
    path: '/dashboard/user',
    component: () => import(`@/views/dashboard/index.vue`),
    children: [
      {
        path: '',
        component: () => import(`@/components/dashboard/DashViews/User.vue`),
        name: 'User',
        meta: { title: 'User', icon: 'mdi-account', role: ['admin'] },
      },
    ],
  },
  {
    path: '/dashboard/problem',
    component: () => import(`@/views/dashboard/index.vue`),
    children: [
      {
        path: '',
        component: () => import(`@/components/dashboard/DashViews/Problem.vue`),
        name: 'Problem',
        meta: {
          title: 'Problem',
          icon: 'mdi-clipboard-outline',
          role: ['admin'],
        },
      },
    ],
  },
  {
    path: '/dashboard/news',
    component: () => import(`@/views/dashboard/index.vue`),
    children: [
      {
        path: '',
        component: () => import(`@/components/dashboard/DashViews/News.vue`),
        name: 'News',
        meta: { title: 'News', icon: 'mdi-autorenew', role: ['admin'] },
      },
    ],
  },
  {
    path: '/dashboard/rejudge',
    component: () => import(`@/views/dashboard/index.vue`),
    children: [
      {
        path: '',
        component: () => import(`@/components/dashboard/DashViews/Rejudge.vue`),
        name: 'Rejudge',
        meta: { title: 'Rejudge', icon: 'mdi-home', role: ['admin'] },
      },
    ],
  },
  // dashboardRouter
  // // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new VueRouter({
    mode: 'history', // require service support
    base: process.env.BASE_URL,
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

Guards(router);
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465

export default router;
