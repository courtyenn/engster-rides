<script setup lang="ts">
import { computed } from "vue";

const SIZES = ["XS", "SM", "M", "LG", "XL", "XXL"];
type SizeTuple = typeof SIZES;
type Size = SizeTuple[number];

export type SizeOption = Size;

const sizeMap: Record<Size, string> = {
  XS: "Extra Small",
  SM: "Small",
  M: "Medium",
  LG: "Large",
  XL: "Extra Large",
  XXL: "Extra Extra Large",
};
const props = defineProps<{
  options: SizeOption[];
  selected: string;
  disabledSizes: string[];
}>();
const emit = defineEmits(["select"]);
const sortedOptions = computed(() => {
  return props.options.sort((a, b) => {
    return SIZES.indexOf(a) - SIZES.indexOf(b) > 0 ? 1 : -1;
  });
});

const isDisabled = (option: SizeOption) => {
  return props.disabledSizes.includes(option);
};
const handleSizeClick = (event: Event, option: SizeOption) => {
  if (!isDisabled(option)) {
    emit("select", option);
  } else {
    event.preventDefault();
  }
};
</script>

<template>
  <div class="size_button_group flex flex-wrap gap-4">
    <div
      v-for="option in sortedOptions"
      class="flex"
    >
      <input
        :id="option"
        name="product-size"
        class="size__input"
        type="radio"
        :key="option"
        :checked="option === props.selected"
        :aria-disabled="isDisabled(option)"
        @click="handleSizeClick($event, option)"
      />
      <label
        :for="option"
        class="size__button box-border w-14 cursor-pointer border-2 pb-2 pt-2 text-center font-bold text-black hover:opacity-80"
      >
        <span aria-hidden="true">{{ option }}</span>
        <span class="sr-only">{{ sizeMap[option] }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.size__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  &:checked + .size__button {
    border: 2px solid #000;
  }
  &[aria-disabled="true"] + .size__button {
    border: 2px solid #ccc;
    cursor: not-allowed;
    opacity: 0.4;
    position: relative;
    &::after {
      content: "";
      border: 1px solid #ccc;
      position: absolute;
      transform: rotate(323deg);
      width: 127%;
      height: 1px;
      top: 0;
      transform-origin: right;
      right: 0;
      z-index: 0;
    }
  }
}
</style>
