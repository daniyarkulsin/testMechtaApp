import { createRouter, createWebHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppProductPage from "@/components/AppProductPage.vue";

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
  ],
});

export default router;
