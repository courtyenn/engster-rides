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
        class="color_button border-2 border-accent checked:border-8 checked:border-accent"
        :key="option.value"
        :style="{ backgroundColor: option.color }"
        @click="props.onSelect(option)"
        :checked="option.value === props.selected"
      />
      <label class="sr-only">{{ option.label }}</label>
    </span>
  </div>
</template>

<style scoped>
.color_button_group {
  display: flex;
}
.color_button {
  width: 26px;
  height: 26px;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
