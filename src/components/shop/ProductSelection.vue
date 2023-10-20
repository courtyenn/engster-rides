<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import type { Shirt, ShirtVariant } from "../../utils/sanity";
import { ref, computed } from "vue";
import ColorOptions, { type ColorOption } from "./ColorOptions.vue";
import ProductCarousel from "./ProductCarousel.vue";
import { PortableText } from "@portabletext/vue";

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
  <div>
    <h1 class="font-accent text-4xl">{{ product.name }}</h1>
    <p class="">Price: {{ product.price }}</p>
    <PortableText :value="product.description" />
    <ColorOptions
      :options="colorOptions"
      :on-select="handleColorSelect"
      :selected="currentVariant.color.color.hex"
    />
    <button
      class="snipcart-add-item rounded-full bg-accent px-4 py-2 font-bold text-white hover:opacity-80"
      :data-item-id="product.slug.current"
      :data-item-price="product.price"
      :data-item-description="product.description"
      :data-item-name="product.name"
      data-item-custom1-name="size"
      data-item-custom1-options="shirt.variants.map((v) => v.size).join('|')"
      :data-item-quantity="1"
    >
      Add to cart
    </button>
  </div>
  <ProductCarousel :images="currentVariant.images" />
</template>
