import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'frontEndPage',
    component: () => import('../views/FrontEndView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/frontEnd/HomeView.vue'),
      },
      {
        path: 'newInfo',
        name: 'newInfo',
        component: () => import('../views/frontEnd/NewInfoView.vue'),
      },
      {
        path: 'productsPage',
        name: 'productsPage',
        component: () => import('../views/frontEnd/ProductsPageView.vue'),
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/frontEnd/SingleProductView.vue'),
      },
      {
        path: 'carts',
        name: 'carts',
        component: () => import('../views/frontEnd/CartsView.vue'),
        children: [
          {
            path: 'confirm',
            name: 'confirm',
            component: () => import('../views/frontEnd/CartConfirm.vue'),
          },
          {
            path: 'fillIn',
            name: 'fillIn',
            component: () => import('../views/frontEnd/CartFillIn.vue'),
          },
          {
            path: 'isPaid/:paidId',
            name: 'isPaid',
            component: () => import('../views/frontEnd/PaidConfirm.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/frontEnd/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'adProducts',
        name: 'adProducts',
        component: () => import('../views/dashboard/AdminProducts.vue'),
        children: [
          {
            path: 'adProductList',
            name: 'adProductList',
            component: () => import('../views/dashboard/AdProductList.vue'),
          },
          {
            path: 'adOrders',
            name: 'adOrders',
            component: () => import('../views/dashboard/AdOrders.vue'),
          },
          {
            path: 'adArticle',
            name: 'adArticle',
            component: () => import('../views/dashboard/AdArticle.vue'),
          },
          {
            path: 'adCoupons',
            name: 'adCoupons',
            component: () => import('../views/dashboard/AdCoupons.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // linkActiveClass: 'active',
  scrollBehavior(to) {
    // console.log(to, from);
    if (to.fullPath.match('/information')) {
      return {
        top: 0,
      };
    }
    if (to.fullPath.match('/')) {
      return {
        top: 0,
      };
    }
    return {};
  },
  routes,
});

export default router;
