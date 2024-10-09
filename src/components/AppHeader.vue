<template>
  <header class="header">
    <RouterLink to="/" class="header__logo">Test.kz</RouterLink>
    <div class="header__input">
      <input
        class="header__input-inner"
        v-model="store.inputText"
        placeholder="Поиск товара"
      />
      <button>
        <img src="@/assets/img/icons/search.svg" alt="search icon" />
      </button>
    </div>
    <div class="header__links">
      <a href="#">
        <img src="../assets/img/icons/heart.svg" alt="heart icon" />
      </a>
      <RouterLink to="/test">
        <img src="../assets/img/icons/cart.svg" alt="cart icon" />
      </RouterLink>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useInputTextStore } from "@/stores/inputText";

const store = useInputTextStore();
</script>
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(60px, 10vw, 80px);
  background-color: #2667ff;
  margin-bottom: 1vh;
  padding: 0 10px;

  &__logo {
    font-size: 24px;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    margin-right: 7vw;

    @media (max-width: 480px) {
      display: none;
    }
  }

  &__input {
    display: flex;
    background-color: #fff;
    border-radius: 50px;
    padding-right: 20px;

    &-inner {
      border-radius: 50px;
      width: clamp(50px, 50vw, 700px);
      border: none;
      outline: none;
      padding: 12px 5px 12px 24px;
    }
    button {
      padding: 5px;
      border: none;
      background-color: #fff;
    }
  }
  &__links {
    a {
      margin-left: 20px;
    }
  }
}
</style>
