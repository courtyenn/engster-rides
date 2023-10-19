<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import type { Shirt, ShirtVariant } from "../../utils/sanity";
import { ref, computed } from "vue";
import ColorOptions, { type ColorOption } from "./ColorOptions.vue";
import ProductCarousel from "./ProductCarousel.vue";

const props = defineProps<{ product: Shirt }>();
const currentVariantIdx = ref(0);

const list = props.product.variants.map((variant) => {
  return {
    color: variant.color.color.hex,
    value: variant.color.color.hex,
    label: variant.color.colorName,
  };
});
const colorOptions = ref(list);

const currentVariant = computed<ShirtVariant>(() => {
  return props.product.variants[currentVariantIdx.value];
});

const handleColorSelect = (option: ColorOption) => {
  currentVariantIdx.value = props.product.variants.findIndex(
    (variant) => variant.color.color.hex === option.value,
  );
};
</script>

<template>
  <ColorOptions
    :options="colorOptions"
    :on-select="handleColorSelect"
    :selected="currentVariant.color.color.hex"
  />
  <ProductCarousel :images="currentVariant.images" />
</template>
