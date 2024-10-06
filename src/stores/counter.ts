import { ref } from "vue";
import { defineStore } from "pinia";
import type Product from "@/types/Product";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  return { products };
});
