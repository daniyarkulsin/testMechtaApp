<template>
  <main class="wrapper">
    <AppFilter @active-btn="getActiveBtn" />
    <h2 class="loading" v-if="loading">Loading...</h2>
    <h2 class="error" v-if="error">Error</h2>
    <div v-if="!loading" class="home">
      <AppCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import AppFilter from "@/components/AppFilter.vue";
import AppCard from "@/components/AppCard.vue";
import type Product from "@/types/Product";
import { onMounted, ref, watch } from "vue";

const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const products = ref<Product[]>([]);
const activeBnt = ref<string>("");

const getActiveBtn = (value: string): void => {
  activeBnt.value = value;
};

const fetchProducts = async () => {
  try {
    const response = await fetch(
      "https://665801795c36170526468b7c.mockapi.io/api/v1/products"
    );
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
    const data = await response.json();
    products.value = data;
  } catch (err: any) {
    error.value = "Ошибка при загрузке данных: " + err.message;
  } finally {
    loading.value = false;
  }
};

watch(activeBnt, () => {
  if (activeBnt.value === "rating") {
    products.value.sort((a, b) => b.rating - a.rating);
  } else if (activeBnt.value === "priceDown") {
    products.value.sort((a, b) => a.price - b.price);
  } else if (activeBnt.value === "priceUp") {
    products.value.sort((a, b) => b.price - a.price);
  } else if (activeBnt.value === "createdAt") {
    products.value.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (activeBnt.value === "title") {
    products.value.sort((a, b) => a.title.localeCompare(b.title));
  }
});

onMounted(fetchProducts);
</script>
<style scoped lang="scss">
.home {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: clamp(5px, 5vw, 10px);
  margin-top: 20px;
}
.loading {
  display: flex;
  justify-content: center;
  margin-top: 20vh;
}
</style>
