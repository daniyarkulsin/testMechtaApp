<template>
  <div class="container">
    <p>Сортировать:</p>

    <!-- Кнопки для десктопа -->
    <div class="filter__desktop" v-if="!isMobile">
      <button
        :class="[
          'filter__desktop--buttons',
          active === `${item.value}` ? 'active' : '',
        ]"
        v-for="(item, idx) in list"
        :key="idx"
        :value="item.value"
        @click="addActiveClass"
      >
        {{ item.name }}
      </button>
    </div>

    <!-- Селект для мобильных -->
    <select class="filter__mobile" v-else @change="addActiveClassSelect">
      <option v-for="(item, idx) in list" :key="idx" :value="item.value">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, onMounted, onBeforeUnmount } from "vue";
const active = ref<string>("");
const isMobile = ref<boolean>(false);
const list = [
  {
    name: "По популярности",
    value: "rating",
  },
  {
    name: "Сначала подешевле",
    value: "priceDown",
  },
  {
    name: "Сначала подороже",
    value: "priceUp",
  },
  {
    name: "Сначала новое",
    value: "createdAt",
  },
  {
    name: "По алфавиту",
    value: "title",
  },
];
const emit = defineEmits({
  activeBtn: (value: string) => value,
});
// Обработка клика по кнопке
const addActiveClass = (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement;
  active.value = target.value;
  emit("activeBtn", active.value);
};
// Функция для отслеживания размера экрана
const handleResize = () => {
  isMobile.value = window.innerWidth < 700;
};
// Обработка выбора в выпадающем списке
const addActiveClassSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  active.value = target.value;
  emit("activeBtn", active.value);
};

onMounted(() => {
  handleResize(); // Проверяем при загрузке
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding-left: 20px;
  font-size: clamp(12px, 1.5vw, 16px);
  color: #322f38;

  p {
    margin-right: 1vw;
  }
}

.filter__desktop {
  &--buttons {
    border: none;
    background-color: transparent;
    font-size: inherit;
    cursor: pointer;
    margin-right: 1vw;
    padding: 1vh 0;
  }
}
.active {
  margin-bottom: -2px;
  border-bottom: 2px solid #2667ff;
}
</style>
