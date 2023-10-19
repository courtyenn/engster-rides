<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import type { Shirt, ShirtVariant } from "../../utils/sanity";
import { ref, computed } from "vue";

const props = defineProps<{ product: Shirt }>();
const currentVariantIdx = ref(0);

console.log("what is product?", props.product);
const currentVariant = computed<ShirtVariant>(() => {
  return props.product.variants[currentVariantIdx.value];
});

console.log("what is currentVariant?", currentVariant.value);
</script>

<template>
  <ul>
    <li
      v-for="(variant, idx) in props.product.variants"
      :key="variant.sku"
      @click="currentVariantIdx = idx"
    >
      <button
        type="button"
        :style="{ backgroundColor: variant.color.color.hex }"
      >
        VARIANTS - {{ variant.name || variant.sku }}
      </button>
    </li>
  </ul>
  <Carousel
    :items-to-show="1"
    class="goats"
  >
    <template #addons>
      <Navigation />
      <span>🐐🐐🐐</span>
      <Pagination />
    </template>

    <Slide
      v-for="image in currentVariant.images"
      :key="image.asset.assetId"
    >
      <img
        :src="image.asset.url"
        alt="Picture of shirt"
      />
    </Slide>
  </Carousel>
</template>
<style scoped>
.goats {
  border: 1px solid black;
}
</style>
