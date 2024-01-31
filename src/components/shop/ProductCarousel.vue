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
    class="col-start-1 row-span-full row-start-1"
  >
    <template #addons>
      <Navigation />
      <Pagination />
    </template>

    <Slide
      v-for="image in props.images"
      :key="image.asset.assetId"
    >
      <div class="carousel__item shirt-animation w-5/6 md:w-96">
        <picture>
          <source :src="`${image.asset.url}?w=384&h=486&dpr=1&sharp=30`" />
          <source
            media="(min-width: 700px)"
            :src="`${image.asset.url}?w=384&h=486&dpr=2&sharp=30`"
          />
          <source
            media="(min-width: 900px)"
            :src="`${image.asset.url}?w=384&h=486&dpr=3&sharp=30`"
          />
          <img
            :src="`${image.asset.url}?w=384&h=486&dpr=3&sharp=30`"
            :alt="`${image.alt}`"
          />
        </picture>
      </div>
    </Slide>
  </Carousel>
</template>

<style scoped></style>
