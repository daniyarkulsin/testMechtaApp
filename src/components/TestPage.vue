<template>
  <div class="wrapper">
    <button v-bind="objectOfAttrs"></button>
    <button @click="openDialog">Open dialog</button>
    <dialog v-bind="dialog">
      <form @submit.prevent>
        <h4>Форма отправки сообщения</h4>
        <input
          style="
            outline: none;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px;
          "
          type="text"
          placeholder="Введите текст..."
        />
        <button
          style="
            background-color: aquamarine;
            border-radius: 5px;
            border: none;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
            padding: 5px 10px;
            cursor: pointer;
          "
        >
          Submit
        </button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const objectOfAttrs = {
  value: "test",
  id: "container",
  class: "wrapper",
  style: "background-color:green",
  innerHTML: "Hello, world!",
};
const dialog = ref({
  open: false,
  id: "dialog",
  class: "dialog",
});

const openDialog = () => {
  dialog.value.open = !dialog.value.open;
};
</script>
<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
