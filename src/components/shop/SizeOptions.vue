<script setup lang="ts">
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
type SizeTuple = typeof SIZES;
type Size = SizeTuple[number];

const sizeMap = {
  XS: "Extra Small",
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "Extra Large",
  XXL: "Extra Extra Large",
};
const props = defineProps<{
  options: SizeTuple;
  onSelect: (option: Size) => void;
  selected: string;
}>();
</script>

<template>
  <div class="size_button_group flex flex-wrap gap-4">
    <div
      v-for="option in props.options"
      class="flex"
    >
      <input
        :id="option"
        name="product-size"
        class="size__input"
        type="radio"
        :key="option"
        @click="props.onSelect(option)"
        :checked="option === props.selected"
      />
      <label
        :for="option"
        class="size__button box-border w-14 cursor-pointer border-2 pb-2 pt-2 text-center font-bold text-black hover:opacity-80"
      >
        {{ option }}
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
}
</style>
