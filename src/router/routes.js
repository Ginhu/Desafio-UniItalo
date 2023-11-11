const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("pages/HomePage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("pages/admin/AdminPage.vue"),
      },
      {
        path: "form/:nome?",
        name: "form",
        component: () => import("pages/admin/Form.vue"),
      },
    ],
  },
];

export default routes;
