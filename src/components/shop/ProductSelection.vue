<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import type { Shirt, ShirtVariant } from "../../utils/sanity";
import { ref, computed } from "vue";
import ColorOptions, { type ColorOption } from "./ColorOptions.vue";
import ProductCarousel from "./ProductCarousel.vue";
import PortableText from "../common/PortableText.vue";
import SizeOptions, { type SizeOption } from "./SizeOptions.vue";

const props = defineProps<{ product: Shirt }>();
const currentVariantIdx = ref(0);

const list: ColorOption[] = [];
props.product.variants.forEach((variant) => {
  if (list.find((item) => item.value === variant.color.color.hex)) return;
  list.push({
    color: variant.color.color.hex,
    value: variant.color.color.hex,
    label: variant.color.colorName,
  });
});
const colorOptions = ref(list);

const currentVariant = computed<ShirtVariant>(() => {
  return props.product.variants[currentVariantIdx.value];
});

const sizeList = new Set<string>();
props.product.variants.forEach((variant) => {
  sizeList.add(variant.size);
});

const currentSizeList = [...sizeList];
const disabledSizes = computed(() => {
  return currentSizeList.filter(
    (size) =>
      !props.product.variants.find(
        (variant) =>
          currentVariant.value.color.color.hex === variant.color.color.hex &&
          variant.size === size,
      ),
  );
});

const handleColorSelect = (option: ColorOption) => {
  currentVariantIdx.value = props.product.variants.findIndex(
    (variant) => variant.color.color.hex === option.value,
  );
};
const handleSizeSelect = (option: string) => {
  currentVariantIdx.value = props.product.variants.findIndex(
    (variant) => variant.size === option,
  );
};
</script>

<template>
  <div class="flex flex-col gap-4 sm:gap-8">
    <h1 class="font-accent text-4xl font-bold">{{ product.name }}</h1>
    <dl class="flex flex-col gap-4">
      <dt class="sr-only">Price:</dt>
      <dd class="text-2xl font-semibold">${{ product.price }}</dd>
      <dt class="sr-only">Description:</dt>
      <dd><PortableText :value="product.description" /></dd>
      <dt class="inline-block font-bold">Color:</dt>
      <dd>
        <ColorOptions
          :options="colorOptions"
          :selected="currentVariant.color.color.hex"
          @select="handleColorSelect"
        />
      </dd>
      <dt class="font-bold">Size:</dt>
      <dd>
        <SizeOptions
          :options="currentSizeList"
          :selected="currentVariant.size"
          :disabled-sizes="disabledSizes"
          @select="handleSizeSelect"
        />
      </dd>
    </dl>

    <button
      class="snipcart-add-item w-full rounded-full bg-accent px-4 py-2 font-bold text-white hover:opacity-80 lg:w-6/12"
      :data-item-id="product.slug.current"
      :data-item-price="product.price"
      :data-item-description="product.excerpt"
      :data-item-name="product.name"
      data-item-custom1-name="size"
      :data-item-custom1-options="currentSizeList.join('|')"
      :data-item-custom1-value="currentVariant.size"
      data-item-custom2-name="color"
      :data-item-custom2-options="colorOptions.map((o) => o.label).join('|')"
      :data-item-custom2-value="currentVariant.color.colorName"
      :data-item-quantity="1"
    >
      Add to cart
    </button>
  </div>
  <ProductCarousel :images="currentVariant.images" />
</template>
