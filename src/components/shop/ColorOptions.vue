<script setup lang="ts">
export type ColorOption = {
  color: string;
  value: string;
  label: string;
};
export type ColorOptions = ColorOption[];
const props = defineProps<{
  options: ColorOptions;
  onSelect: (option: ColorOption) => void;
  selected: string;
}>();
</script>

<template>
  <div class="color_button_group">
    <span v-for="option in props.options">
      <input
        :id="option.label"
        name="product-color"
        class="color__input"
        type="radio"
        :key="option.value"
        @click="props.onSelect(option)"
        :checked="option.value === props.selected"
      />
      <label
        :for="option.label"
        class="color_button"
        :style="{ backgroundColor: option.color }"
        ><span class="sr-only">{{ option.label }}</span></label
      >
    </span>
  </div>
</template>

<style scoped>
.color_button_group {
  display: flex;
}
.color_button {
  width: 36px;
  height: 36px;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  display: block;
}
.color__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  &:checked + .color_button {
    border: 2px solid #000;
  }
}
</style>
