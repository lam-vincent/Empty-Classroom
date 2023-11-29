import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "",
        component: () => import("./pages/Login.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: () => import("./pages/Dashboard.vue"),
      },
    ],
  },
  {
    path: "/find",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: () => import("./pages/Find.vue"),
      },
    ],
  },
  {
    path: "/group",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: () => import("./pages/Group.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        component: () => import("./pages/Login.vue"),
      },
    ],
  },
  {
    path: "/register",
    component: AuthLayout,
    children: [
      {
        path: "",
        component: () => import("./pages/Register.vue"),
      },
    ],
  },
  {
    path: "/reserve",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: () => import("./pages/Reserve.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
