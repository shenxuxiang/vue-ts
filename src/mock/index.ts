import Mock from "mockjs";

// 登录
Mock.mock("/v1.0/user", "post", {
  code: 0,
  message: "操作成功",
  data: {
    id: "6396cddf1a4afe167885797f",
    username: "jasmine",
    password: "",
    regionCode: "4100",
    regionName: "湖南省",
    organizationId: 0,
    realName: "jasmine",
    phone: "",
    avatar: "",
    clientId: "end",
    status: 1,
    superAdmin: false,
    createdTime: null,
    updateTime: "2022-12-12 14:44:46",
    token: "21c9a874-a20b-4eec-8b7d-c442a525b5fc",
    loginType: "end",
    roleIdList: ["1", "2"],
    resourceTree: [
      {
        id: "/home",
        path: "/home",
      },
      {
        id: "/list",
        path: "/list",
      },
      {
        id: "/work-manage",
        path: "/work-manage",
      },
      {
        id: "/system",
        path: "/system",
        children: [
          {
            id: "/system/user",
            path: "/system/user",
          },
          {
            id: "/system/role",
            path: "/system/role",
          },
          {
            id: "/system/resource",
            path: "/system/resource",
          },
          {
            id: "/system/dict",
            path: "/system/dict",
          },
          {
            id: "/system/log",
            path: "/system/log",
          },
        ],
      },
    ],
  },
});
