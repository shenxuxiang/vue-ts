import type { BasicContextType } from '@/common/basicContext';
import { createRouter, createWebHistory } from 'vue-router';
import { getUserToken, isEmpty, matchPath } from '@/utils';
import { getMenuItems, getPermissions } from './routerMap';
import routerMap, { getHomePagePath } from './routerMap';
import MainLayout from '@/components/MainLayout.vue';
import LazyLoader from '@/components/LazyLoader';
import type { RouteRecordRaw } from 'vue-router';
export type { MenuItems } from './routerMap';
import { queryUserInfo } from '@/services';
import { message } from 'ant-design-vue';
import { inject } from 'vue';

const noCheckupPageList = ['/login', '/404', '/update-passwd'];

const router = createRouter({
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: routerMap as RouteRecordRaw[],
    },
    {
      path: "/login",
      name: "login",
      component: LazyLoader(() => import("../pages/login.vue")),
      meta: { requiresAuth: false },
    },
    {
      path: "/update-password",
      name: "updatePassword",
      component: LazyLoader(() => import("../pages/updatePassword.vue")),
      meta: { requiresAuth: true },
    },
    {
      path: "/404",
      name: "404",
      component: LazyLoader(() => import("../pages/404.vue")),
      meta: { requiresAuth: false },
    },
  ],
  history: createWebHistory(),
});

export default router;

router.beforeEach(async (to, _, next) => {
  const {
    meta: { requiresAuth = true },
    fullPath,
  } = to;
  const { basicContext, updateBasicContext } = inject<BasicContextType>('basicContext')!;

  const token = getUserToken();
  if (requiresAuth) {
    if (!token) {
      message.warning('用户暂未登录！');
      return next('/login');
    }

    if (isEmpty(basicContext.userInfo)) {
      const response = await queryUserInfo();
      const { data } = response || {};
      const { resourceTree } = data || [];

      const userInfo = data;
      const userPermissions = getPermissions(resourceTree);
      const userMenuItems = getMenuItems(userPermissions);
      updateBasicContext({ userInfo, userPermissions, userMenuItems });
    }

    if (fullPath === '/') {
      const homePage = getHomePagePath(basicContext.userMenuItems);
      if (homePage) return next(homePage);
    }

    if (routerGuard(basicContext.userPermissions, fullPath)) {
      return next();
    } else {
      return next('/404');
    }
  }

  return next();
});

/**
 * 路由守卫
 * @param permissions 路由权限集合
 * @param pathname 页面路径
 * @returns
 */
export function routerGuard(permissions: Map<string, object>, pathname: string) {
  if (noCheckupPageList.indexOf(pathname) >= 0) return true;
  if (permissions.has(pathname)) return true;

  let matched;
  permissions.forEach((_, k) => {
    if (matched!) return;
    matched = matchPath(k, pathname);
  });

  if (matched) return true;

  return false;
}








