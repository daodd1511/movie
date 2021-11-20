<template>
  <Carousel type="popular"></Carousel>
  <Slider type="popular" typeForHeader="Popular" genre=""/>
  <Slider type="top_rated" typeForHeader="Top Rated" genre=""/>
  <Slider type="now_playing" typeForHeader="Now Playing" genre=""/>
  <Slider type="upcoming" typeForHeader="Upcoming" genre=""/>
  <Slider
    type="animation"
    typeForHeader="Animation"
    :genre="genres.animation"
  />
  <Slider type="drama" typeForHeader="Drama" :genre="genres.drama" />
  <Slider type="history" typeForHeader="History" :genre="genres.history" />
  <Slider type="horror" typeForHeader="Horror" :genre="genres.horror" />
  <Slider type="music" typeForHeader="Music" :genre="genres.music" />
  <Slider
    type="science"
    typeForHeader="Science Fiction"
    :genre="genres.science"
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
      genres: env.GENRES,
    };
  },
};
</script>

<style scoped></style>
