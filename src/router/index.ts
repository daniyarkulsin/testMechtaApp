import { createRouter, createWebHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppProductPage from "@/components/AppProductPage.vue";
import TestPage from "@/components/TestPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/product/:id",
      name: "product",
      component: AppProductPage,
    },
    {
      path: "/test",
      name: "test",
      component: TestPage,
    },
  ],
});

export default router;
