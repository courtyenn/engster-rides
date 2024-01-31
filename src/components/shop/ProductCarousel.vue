<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import type { DumbImageAssetWrapper } from "../../utils/sanity";
const props = defineProps<{
  images: DumbImageAssetWrapper[];
}>();
</script>

<template>
  <Carousel
    :items-to-show="1"
    class=""
  >
    <template #addons>
      <Navigation />
      <Pagination />
    </template>

    <Slide
      v-for="image in props.images"
      :key="image.asset.assetId"
    >
      <div class="carousel__item shirt-animation">
        <picture>
          <source
            :src="`${image.asset.url}?w=384&h=486&dpr=1&sharp=30`"
            class="max-h-[380px]"
          />
          <source
            media="(min-width: 700px)"
            :src="`${image.asset.url}?w=384&h=486&dpr=2&sharp=30`"
            class="max-h-[400px]"
          />
          <img
            :src="`${image.asset.url}`"
            :alt="`${image.alt}`"
            class="max-h-[500px]"
          />
        </picture>
      </div>
    </Slide>
  </Carousel>
</template>
