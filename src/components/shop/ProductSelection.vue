<script setup lang="ts">
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
  const initialIndex = props.product.variants.findIndex(
    (variant) =>
      variant.color.color.hex === option.value &&
      variant.size === currentVariant.value.size,
  );
  if (initialIndex === -1) {
    currentVariantIdx.value = props.product.variants.findIndex(
      (variant) => variant.color.color.hex === option.value,
    );
  } else {
    currentVariantIdx.value = initialIndex;
  }
};
const handleSizeSelect = (option: string) => {
  const initialIndex = props.product.variants.findIndex(
    (variant) =>
      variant.size === option &&
      variant.color.color.hex === currentVariant.value.color.color.hex,
  );
  if (initialIndex === -1) {
    currentVariantIdx.value = props.product.variants.findIndex(
      (variant) => variant.size === option,
    );
  } else {
    currentVariantIdx.value = initialIndex;
  }
};

const handleAddButton = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  window.Snipcart.api.cart.items.add({
    id: props.product.slug.current,
    price: props.product.price,
    description: props.product.excerpt,
    name: props.product.name,
    image: currentVariant.value.images[0].asset.url,
    customFields: [
      {
        type: "dropdown",
        required: false,
        name: "size",
        options: currentSizeList.join("|"),
        value: currentVariant.value.size,
      },
      {
        type: "dropdown",
        required: false,
        name: "color",
        options: colorOptions.value.map((o) => o.label).join("|"),
        value: currentVariant.value.color.colorName,
      },
    ],
    quantity: 1,
    url: `/shirt/${props.product.slug.current}`,
    categories: ["shirt"],
    weight: 155,
    shippable: true,
    stackable: true,
    taxable: true,
  });
};
</script>

<template>
  <div class="flex flex-col gap-4 sm:gap-8">
    <h1 class="text-graffiti text-5xl font-bold tracking-widest">
      {{ product.name }}
    </h1>
    <dl class="flex flex-col gap-4">
      <dt class="sr-only">Price:</dt>
      <dd
        :class="{
          'text-2xl font-semibold': !!product.discountPrice === false,
          discount__price: product.discountPrice > 0,
        }"
      >
        ${{ product.price }}
      </dd>

      <dt
        v-if="product.discountPrice > 0"
        class="sr-only"
      >
        Discount Price:
      </dt>
      <dd
        v-if="product.discountPrice > 0"
        class="text-2xl font-semibold"
      >
        ${{ product.discountPrice }}
      </dd>
      <dt class="sr-only">Description:</dt>
      <dd><PortableText :value="product.description" /></dd>
      <dt class="inline-block">
        <strong>Color:</strong> {{ currentVariant.color.colorName }}
      </dt>
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
      @click="handleAddButton"
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
      data-item-custom3-name="TaxJarCategory"
      data-item-custom3-value="20010"
      data-item-quantity="1"
      :data-item-url="`/shirt/${product.slug.current}`"
      data-item-categories="shirt"
    >
      Add to cart
    </button>
  </div>
  <div class="col-start-1 row-span-full row-start-1 w-5/6 md:w-96">
    <ProductCarousel :images="currentVariant.images" />
  </div>
</template>
<style scoped>
.discount__price {
  text-decoration: line-through;
}
</style>
