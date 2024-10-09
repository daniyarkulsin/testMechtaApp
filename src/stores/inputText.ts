import { defineStore } from "pinia";
import { ref } from "vue";

export const useInputTextStore = defineStore("inputText", () => {
  const inputText = ref<string>("");
  return { inputText };
});
