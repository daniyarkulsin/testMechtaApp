<template>
  <a class="card" @click="goToProduct">
    <div class="card__img">
      <img :src="product.image" alt="#" />
    </div>
    <div class="card__info">
      <h3 class="card__info--title">{{ product.title }}</h3>
      <div class="card__info--stars">
        <img
          v-for="(_, idx) of 5"
          src="../assets/img/icons/star.svg"
          alt="#"
          :key="idx"
        />
        <span class="card__info--reviews">{{ product.rating }} отзывов</span>
      </div>
    </div>
    <div class="price">
      <div class="price__content">
        <div class="price__content--discount">
          <del>{{ Math.round(product.price).toLocaleString("ru-RU") }} ₸ </del>
          <span>-{{ product.discount }}%</span>
        </div>
        <p class="price__content--valid">
          {{ Math.round(product.price).toLocaleString("ru-RU") }} ₸
        </p>
      </div>
      <button @click.stop class="price__button">
        <img src="../assets/img/icons/cartBtn.svg" alt="#" />
      </button>
    </div>
    <button class="heart__button" @click.stop>
      <img src="../assets/img/icons/heartBtn.svg" alt="#" />
    </button>
  </a>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { defineProps } from "vue";
import type Product from "@/types/Product";
const props = defineProps<{
  product: Product;
}>();
const emit = defineEmits(["goToProduct"]);
const router = useRouter();
const goToProduct = () => {
  router.push({ name: "product", params: { id: props.product.id } });
};
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: clamp(200px, 100%, 300px);
  padding: 20px 24px;
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  position: relative;

  @media (max-width: 970px) {
    padding: 8px;
    width: 48%;
  }

  &__img {
    margin-bottom: 1vh;
    img {
      max-width: 100%;
      padding: 0 5px;
    }
  }

  &__info {
    margin-bottom: 2vh;
    &--title {
      font-weight: normal;
      font-size: clamp(12px, 2vw, 14px);
      margin-bottom: 8px;
    }

    &--stars {
      & img {
        width: clamp(9px, 2vw, 12px);
        margin-right: clamp(2px, 0.5vw, 4px);
      }
    }

    &--reviews {
      font-size: clamp(11px, 2vw, 14px);
      color: #5c5c5c;
    }
  }
}
.price {
  display: flex;
  justify-content: space-between;
  @media (max-width: 480px) {
    flex-direction: column;
  }

  &__content {
    font-size: 32px;
    font-weight: 700;
    &--discount {
      display: flex;
      font-size: 16px;
      font-weight: normal;
      color: #979797;
      margin-bottom: 10px;
      span {
        display: block;
        border-radius: 35px;
        background-color: #f63b00;
        color: #fff;
        padding: 2px 8px;
        font-size: 10px;
        margin-left: 8px;
      }
    }
    &--valid {
      font-size: clamp(20px, 2vw, 32px);
      font-weight: 700;
    }
  }
  &__button {
    padding: 12px;
    border-radius: 12px;
    border: none;
    background-color: #2667ff;
    max-height: 44px;
    align-self: end;

    &:hover {
      background: #1351e2;
    }
    @media (max-width: 480px) {
      margin-top: 10px;
      align-self: stretch;
    }
  }
}
.heart__button {
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 50%;
  padding: 10px;
  border: none;
  background-color: #5454544d;

  @media (max-width: 360px) {
    right: 5px;
    top: 5px;
  }
  &:hover {
    background: #2667ff99;
  }
  img {
    display: block;
    width: clamp(20px, 2vw, 30px);
  }
}
</style>
