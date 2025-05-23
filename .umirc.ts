import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "火狐之茵",
    layout: "mix",
    contentWidth: "Fluid",
  },
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      icon: "Home",
      name: "首页",
      path: "/home",
      component: "./Home",
    },
    {
      icon: "Team",
      name: "用户管理",
      path: "/user",
      component: "./user-mgmt",
    },
    {
      icon: "User",
      name: "球员管理",
      path: "/player",
      component: "./player-mgmt",
    },
    {
      icon: "Trophy",
      name: "赛事管理",
      path: "/game",
      component: "./game-mgmt",
    },
    {
      icon: "solution",
      name: "阵型管理",
      path: "/formation",
      routes: [
        {
          name: '阵型列表',
          path: "/formation/list",
          component: "./formation-mgmt",
        },
      ]
    },
    {
      name: '阵型编辑',
      path: "/formation/edit",
      component: "./formation-mgmt/edit",
      hideInMenu: true,
      layout: false,
    },
    {
      icon: "Fund",
      name: "运营中心",
      path: "/operations",
      component: "./game-mgmt",
    },
    {
      name: "我的俱乐部",
      path: "/my-club",
      component: "./my-club",
      hideInMenu: true,
    },
    {
      layout: false,
      name: "登录",
      path: "/login",
      component: "./login",
      hideInMenu: true,
    },
  ],

  npmClient: "pnpm",
  tailwindcss: {},
});
