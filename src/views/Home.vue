<template>
  <Carousel type="popular"></Carousel>
  <Slider type="popular" typeForHeader="Popular" genre="" />
  <Slider type="top_rated" typeForHeader="Top Rated" genre="" />
  <Slider
    v-for="genre in genres"
    :key="genre.id"
    :type="genre.name"
    :typeForHeader="genre.name"
    :genre="genre.id"
  />
</template>

<script>
import Slider from "@/components/Slider.vue";
import Carousel from "@/components/Carousel.vue";
import env from "@/env.js";
export default {
  components: { Slider, Carousel },
  data() {
    return {
      genres: env.DISPLAY_GENRES,
    };
  },
};
</script>

<style scoped></style>
