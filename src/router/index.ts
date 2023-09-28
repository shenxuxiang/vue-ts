import { createRouter, createWebHistory } from "vue-router";
import { isEmpty, getToken, matchPath } from "@/utils";
import MainLayout from "@/components/MainLayout.vue";
import LazyLoader from "@/components/LazyLoader";
import { message } from "ant-design-vue";
import useMainStore from "@/store/main";
import { storeToRefs } from "pinia";
import type { VNode } from "vue";
import routes from "./routerMap";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: routes,
    },
    {
      path: "/login",
      name: "login",
      component: LazyLoader(() => import("../pages/login/index.vue")),
      meta: { requiresAuth: false },
    },
    {
      path: "/update-password",
      name: "updatePassword",
      component: LazyLoader(() => import("../pages/updatePassword/index.vue")),
      meta: { requiresAuth: false },
    },
    {
      path: "/404",
      name: "404",
      component: LazyLoader(() => import("../pages/404.vue")),
      meta: { requiresAuth: false },
    },
  ],
  history: createWebHistory(),
  scrollBehavior: (...args: any[]) => {
    const [, , savedPosition] = args;
    if (savedPosition) {
      return savedPosition;
    } else {
      setTimeout(() => {
        const container = document.querySelector(".qm-container");
        if (container) container!.scrollTop = 0;
      }, 200);
    }
  },
});

// 路由守卫，禁止用户访问没有权限的页面
router.beforeEach(async (...args: any) => {
  const [to, , next] = args;
  const { fullPath, meta } = to;
  // 获取路由的元数据, requiresAuth 表示是否需要用户登录凭证才能访问
  const { requiresAuth } = meta;
  // 需要用户登录凭证访问的路由
  if (requiresAuth) {
    const token = getToken();

    // 验证用户是否已经登录
    if (!token && fullPath !== "/login") {
      message.warning("请先完成用户登录");
      router.push(`/login?redirect=${encodeURIComponent(fullPath)}`);
      return;
    }

    const mainStore = useMainStore();
    const { userInfo, permissions } = storeToRefs(mainStore);

    if (isEmpty(userInfo.value)) await mainStore.queryUserInfo();

    // 查看用户是否可以访问目标路由。
    const hasPermit = [...permissions.value].some((path) =>
      matchPath(path, fullPath),
    );

    if (hasPermit) {
      return next();
    } else {
      message.warn("您访问的页面不存在");
      return next("/404");
    }
  } else {
    return next();
  }
});

export default router;

export type Permissions = Set<string>;

export type ResourceTreeItem = {
  code: string;
  children?: Array<ResourceTreeItem>;
};

export type ResourceTree = Array<ResourceTreeItem>;

export type MenuItem = {
  key: string;
  title?: string;
  label?: string;
  icon?: () => VNode;
  children?: Array<MenuItem> | null;
};

export type RouterMap = Array<{
  path: string;
  label?: string;
  icon?: () => VNode;
  children?: RouterMap;
  component?: VNode;
}>;

// 计算用户的路由权限集合
export function computedPermissions(resourceTree: ResourceTree) {
  const stack = [...resourceTree];
  const result: Permissions = new Set();

  while (stack.length) {
    const { code, children } = stack.shift()!;
    result.add(code);
    let length = children?.length ?? 0;
    while (length--) {
      stack.unshift(children![length]);
    }
  }
  return result;
}

// 计算用户的菜单集合
export function computedMenuResource(
  permissions: Permissions,
  routerMap: RouterMap,
) {
  const result = [] as MenuItem[];
  for (let i = 0; i < routerMap.length; i++) {
    const { path, icon, label, children } = routerMap[i];
    if (permissions.has(path)) {
      result.push({
        icon,
        label,
        key: path,
        children: isEmpty(children)
          ? null
          : computedMenuResource(permissions, children),
      });
    }
  }

  return result;
}
