<template>
  <main class="wrapper">
    <AppFilter @active-btn="getActiveBtn" />
    <h2 class="loading" v-if="loading">Loading...</h2>
    <h2 class="error" v-if="error">Error</h2>
    <div v-if="!loading" class="home">
      <AppCard
        v-for="product in filteredItems"
        :key="product.id"
        :product="product"
      />
    </div>
    <div ref="loadTrigger" class="load-trigger"></div>
  </main>
</template>

<script setup lang="ts">
import AppFilter from "@/components/AppFilter.vue";
import AppCard from "@/components/AppCard.vue";
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";
import type Product from "@/types/Product";
import { useInputTextStore } from "@/stores/inputText";

const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const products = ref<Product[]>([]);
const activeBnt = ref<string>("");
const page = ref<number>(1);
const loadTrigger = ref<null>(null);
const store = useInputTextStore();

const filteredItems = computed(() => {
  return products.value.filter((product) => {
    return product.title.toLowerCase().includes(store.inputText.toLowerCase());
  });
});

const getActiveBtn = (text: string): void => {
  activeBnt.value = text;
  console.log(activeBnt.value);
  console.log(products.value);
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

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `https://665801795c36170526468b7c.mockapi.io/api/v1/products?page=${page.value}&limit=20`
    );
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
    const data = await response.json();
    products.value = [...products.value, ...data];
    if (data.length === 0) {
      observer.disconnect();
    }
    page.value++;
  } catch (err: any) {
    error.value = "Ошибка при загрузке данных: " + err.message;
  } finally {
    loading.value = false;
  }
};

// Функция для подгрузки товаров
// const loadMoreProducts = async () => {
//   const response = await fetch(
//     `https://665801795c36170526468b7c.mockapi.io/api/v1/products?page=${page.value}$limit=20`
//   );
//   const newProducts = await response.json();
//   products.value.push(...newProducts);
//   page.value++;
// };

// Intersection Observer для отслеживания элемента loadTrigger
let observer: any = null;
const initIntersectionObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      fetchProducts(); // Загружаем товары при попадании триггера в зону видимости
      console.log("load");
    }
  });
  observer.observe(loadTrigger.value);
};

onMounted(() => {
  initIntersectionObserver();
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect(); // Отсоединяем наблюдатель при уничтожении компонента
    console.log("disconnect");
  }
});
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
.load-trigger {
  height: 30px;
  width: 100%;
  background-color: #af1717;
}
</style>
