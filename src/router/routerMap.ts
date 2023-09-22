import { h } from "vue";
import LazyLoader from "@/components/LazyLoader";
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
  // FileSearchOutlined,
  UserSwitchOutlined,
  // ReconciliationOutlined,
} from "@ant-design/icons-vue";

const iconStyle = "font-size: 18px; margin-right: 10px";

export default [
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
