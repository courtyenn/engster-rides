<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import type { DumbImageAssetWrapper } from "../../utils/sanity";

const props = defineProps<{
  images: DumbImageAssetWrapper[];
}>();
</script>

<template>
  <Carousel
    :items-to-show="1"
    class="col-start-1"
  >
    <template #addons>
      <Navigation />
      <Pagination />
    </template>

    <Slide
      v-for="image in props.images"
      :key="image.asset.assetId"
    >
      <div class="carousel__item w-5/6 md:w-96">
        <img
          :src="image.asset.url"
          alt="Picture of shirt"
        />
      </div>
    </Slide>
  </Carousel>
</template>

<style scoped></style>
