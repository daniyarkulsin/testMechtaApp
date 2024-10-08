<template>
  <h2 class="loading wrapper" v-if="loading">Loading...</h2>
  <div class="error" v-if="!loading && contentError"><p>Ошибка 404</p></div>

  <div class="wrapper" v-if="!loading && !contentError">
    <RouterLink to="/">На главную</RouterLink>

    <div class="container">
      <!-- Content -->
      <div class="content">
        <div class="content__title">
          <p class="content__title--text">{{ product?.title }}</p>
          <img
            class="content__title--stars"
            v-for="(_, idx) of 5"
            src="../assets/img/icons/star.svg"
            alt="#"
            :key="idx"
          />
          <span class="content__title--rating">256 отзывов</span>
        </div>
        <div class="content__img">
          <img :src="product?.image" alt="#" />
        </div>
      </div>
      <!-- Info -->
      <div class="info">
        <p class="info__descr">
          {{ product?.description }}
        </p>
        <div class="info__items">
          <h3 class="info__title">О товаре</h3>
          <div class="info__item" v-for="(item, idx) of list" :key="idx">
            <span>{{ item.name }}</span>
            <span>
              {{ (product as any)?.[item.value] }}
            </span>
          </div>
        </div>
        <div class="buy">
          <div class="buy__price">
            <span class="buy__price--one"
              >{{
                typeof product?.price !== "undefined"
                  ? Math.round(product?.price).toLocaleString("ru-RU")
                  : "нет данных"
              }}
              ₸
            </span>
            <span class="buy__price--two"
              ><s
                >{{
                  typeof product?.price !== "undefined"
                    ? Math.round(product?.price).toLocaleString("ru-RU")
                    : "нет данных"
                }}
                ₸</s
              ></span
            >
          </div>
          <div class="buy__button">
            <button @click="openModal" class="buy__button--add">Купить</button>
            <button class="buy__button--like">
              <img src="../assets/img/icons/likeBlue.svg" alt="#" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal__wrapper" v-if="modal">
      <div class="modal">
        <div class="modal__content">
          <div>
            <img src="../assets/img/corzina.png" alt="#" />
          </div>
          <div class="modal__content-text">
            <h2>Спасибо за заказ!</h2>
            <p>Уже собираем</p>
          </div>
        </div>
        <button @click="closeModal" class="modal__btn"><span>x</span></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type Product from "@/types/Product";

const route = useRoute();
const product = ref<Product>();
const loading = ref<boolean>(true);
const modal = ref<boolean>(false);
const contentError = ref<boolean>(false);

const list = [
  {
    name: "Страна-изготовитель",
    value: "countryManufacturer",
  },
  {
    name: "Материал оправы",
    value: "material",
  },
  {
    name: "Материал линзы",
    value: "lenseMaterial",
  },
  {
    name: "Ширина линзы, мм",
    value: "lenseWidth",
  },
  {
    name: "Разъем",
    value: "connector",
  },
];

const getProduct = async () => {
  try {
    const response = await fetch(
      `https://665801795c36170526468b7c.mockapi.io/api/v1/products/${route.params.id}`
    );
    const data: Product = await response.json();
    product.value = data;
    console.log(product.value);
  } catch (error) {
    contentError.value = true;
    console.error("Ошибка при загрузке данных: " + error);
  } finally {
    loading.value = false;
  }
};

const openModal = () => {
  modal.value = true;
};

const closeModal = () => {
  modal.value = false;
};
onMounted(getProduct);
</script>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  padding: 0 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.content {
  display: flex;
  flex-direction: column;
  &__img {
    display: flex;
    justify-content: center;
    flex-basis: 50%;
    border: 1px solid #e7e7e7;
    border-radius: 16px;
    margin-right: 2vw;
    padding: 2vh 4vw 2vh;
    img {
      max-width: clamp(200px, 30vw, 400px);
      height: clamp(200px, 30vw, 400px);
    }
  }

  &__title {
    margin-bottom: 2vh;
    @media (max-width: 768px) {
      margin: 2vh 0;
      order: 1;
    }
    &--text {
      font-size: clamp(24px, 3vw, 32px);
      font-weight: 500;
    }
    &--stars {
      max-width: 12px;
    }
    &--rating {
      color: #5c5c5c;
      margin-left: 6px;
      font-size: 12px;
    }
  }
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 8vh;
  @media (max-width: 768px) {
    padding-top: 0;
  }
  &__descr {
    font-size: 12px;
    margin-bottom: 2vh;
    max-width: 500px;
  }
  &__title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__item {
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    span {
      font-size: 14px;
      color: #6a707c;
      padding: 5px;
      &:last-child {
        margin-left: auto;
        color: #322f38;
        font-weight: 600;
      }
    }
  }
  .buy {
    border-radius: 16px;
    box-shadow: 0px 4px 50px 0px #2667ff26;
    padding: 10px;
    margin-top: 10px;
    &__price {
      margin-bottom: 2vh;

      &--one {
        font-size: 28px;
        font-weight: 700;
      }
      &--two {
        color: #979797;
      }
    }

    &__button {
      display: flex;
      &--add {
        font-size: 24px;
        padding: 15px;
        border-radius: 12px;
        border: none;
        color: #fff;
        background-color: #2667ff;
        margin-right: 5px;
        width: 90%;
        &:hover {
          background: #1351e2;
        }
      }
      &--like {
        padding: 15px 15px;
        border-radius: 12px;
        border: none;
        background-color: #2667ff1f;
      }
    }
  }
}
.modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 360px) {
    align-items: end;
  }
}
.modal {
  position: relative;
  width: 400px;
  height: 270px;
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  background-color: #ffffff;
  padding-top: 20px;
  @media (max-width: 360px) {
    height: 50%;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90%;
    &-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      h2 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        color: #6a707c;
      }
    }
  }
  &__btn {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    span {
      color: #ffffff;
      font-size: 20px;
    }
  }
}
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 34px;
    font-weight: 700;
    color: #ff0000;
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
