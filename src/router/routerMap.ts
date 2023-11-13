import { h } from 'vue';
import type { VNode } from 'vue';
import { isEmpty } from '@/utils';
import LazyLoader from '@/components/LazyLoader';
import type { RouteMeta, RouteComponent } from 'vue-router';
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  PieChartOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  AreaChartOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons-vue";

export type MenuItems = {
  key: string;
  label?: string;
  icon?: () => VNode;
  children?: MenuItems;
}[];

export type RouterItem = {
  path: string;
  name?: string;
  label?: string;
  meta?: RouteMeta;
  redirect?: string;
  icon?: () => VNode;
  children?: RouterItem[];
  component?: RouteComponent;
};

const iconStyle = 'font-size: 18px; margin-right: 10px';

const routerMap: RouterItem[] = [
  {
    path: "/work-info",
    name: "workInfo",
    label: "工作信息",
    icon: () => h(HomeOutlined, { style: iconStyle }),
    component: LazyLoader(() => import("../pages/workInfo.vue")),
    meta: { requiresAuth: true },
  },
  {
    path: "/work-manage",
    name: "workManage",
    label: "工作管理",
    icon: () => h(CalendarOutlined, { style: iconStyle }),
    component: LazyLoader(() => import("../pages/workManage.vue")),
    meta: { requiresAuth: true },
  },
  {
    path: "/statistics-analyse",
    label: "统计分析",
    icon: () => h(AreaChartOutlined, { style: iconStyle }),
    children: [
      {
        label: "作业统计",
        path: "/statistics-analyse/statistics",
        icon: () => h(PieChartOutlined, { style: iconStyle }),
        component: LazyLoader(
          () => import("../pages/statisticsAnalyse/statistics/index.vue"),
        ),
        meta: { requiresAuth: true },
      },
      {
        path: "/statistics-analyse/analyse",
        label: "生产环节覆盖分析",
        icon: () => h(BarChartOutlined, { style: iconStyle }),
        component: LazyLoader(
          () => import("../pages/statisticsAnalyse/analyse/index.vue"),
        ),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/system",
    name: 'system',
    label: "系统设置",
    icon: () => h(SettingOutlined, { style: iconStyle }),
    children: [
      {
        path: "/system/user",
        name: "systemUser",
        label: "用户管理",
        icon: () => h(TeamOutlined, { style: iconStyle }),
        component: LazyLoader(() => import("../pages/system/user/index.vue")),
        meta: { requiresAuth: true },
      },
      {
        path: "/system/role",
        name: "systemRole",
        label: "角色管理",
        icon: () => h(UserSwitchOutlined, { style: iconStyle }),
        component: LazyLoader(() => import("../pages/system/role/index.vue")),
        meta: { requiresAuth: true },
      },
      {
        path: "/system/dictionary",
        name: "systemDict",
        label: "字典管理",
        icon: () => h(FileTextOutlined, { style: iconStyle }),
        component: LazyLoader(() => import("../pages/system/dict/index.vue")),
        meta: { requiresAuth: true },
      },
      {
        path: "/system/app-version",
        name: "AppVersion",
        label: "APP版本管理",
        icon: () => h(DatabaseOutlined, { style: iconStyle }),
        component: LazyLoader(
          () => import("../pages/system/appVersion/index.vue"),
        ),
        meta: { requiresAuth: true },
      },
      {
        path: "/system/work-type",
        name: "workType",
        label: "作业类型管理",
        icon: () => h(SolutionOutlined, { style: iconStyle }),
        component: LazyLoader(
          () => import("../pages/system/workType/index.vue"),
        ),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "",
    redirect: "/work-info",
  },
];

export default routerMap;

/**
 * 获取用户菜单列表
 * @param permissions 用户路由权限
 * @param routes 路由配置
 * @returns
 */
export function getMenuItems(permissions: Map<string, { name: string; path: string }>, routes = routerMap) {
  const menuItems: MenuItems = [];

  routes.forEach((route) => {
    const { label, path, icon, children } = route;
    if (permissions.has(path)) {
      const item: MenuItems[number] = { label, icon, key: path };
      if (children && children.length > 0) {
        item.children = getMenuItems(permissions, children!);
      }

      menuItems.push(item);
    }
  });

  return menuItems;
}

/**
 * 获取用户访问权限集合
 * @param resourceTree
 * @returns
 */
export function getPermissions(resourceTree: any[]) {
  const stack = [...resourceTree];
  const menuMap = new Map<string, { name: string; path: string }>();

  while (stack.length) {
    const item = stack.shift();
    const { code, children, name, type, path } = item;
    let routePath = '';
    if (type === 1 || type === 2) routePath = code;
    if (type === 3) routePath = path;
    if (routePath) {
      menuMap.set(routePath, { path: routePath, name });
      let length = children?.length ?? 0;
      
      while (length--) {
        stack.unshift(children[length]);
      }
    }
  }

  return menuMap;
}

/**
 * 找出菜单的第一项。
 * @param menuItems 用户菜单列表
 * @returns
 */
export function getHomePagePath(menuItems: MenuItems) {
  if (isEmpty(menuItems)) return null;

  const stack = [menuItems[0]];
  let firstItem = {} as (typeof menuItems)[number];
  while (stack.length) {
    firstItem = stack.shift()!;
    if (firstItem?.children?.length) stack.push(firstItem.children[0]);
  }

  return firstItem?.key ?? null;
}
