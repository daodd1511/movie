<template>
  <Carousel type="popular"></Carousel>
  <Slider type="popular" typeForHeader="Popular" genre="" />
  <Slider type="top_rated" typeForHeader="Top Rated" genre="" />
  <Slider
    type="animation"
    typeForHeader="Animation"
    :genre="this.getGenreName(`animation`)"
  />
  <Slider
    type="comedy"
    typeForHeader="Comedy"
    :genre="this.getGenreName(`comedy`)"
  />
  <Slider
    type="crime"
    typeForHeader="Crime"
    :genre="this.getGenreName(`crime`)"
  />
  <Slider
    type="drama"
    typeForHeader="Drama"
    :genre="this.getGenreName(`drama`)"
  />
  <Slider
    type="history"
    typeForHeader="History"
    :genre="this.getGenreName(`history`)"
  />
  <Slider
    type="horror"
    typeForHeader="Horror"
    :genre="this.getGenreName(`horror`)"
  />
  <Slider
    type="music"
    typeForHeader="Music"
    :genre="this.getGenreName(`music`)"
  />
  <Slider
    type="romance"
    typeForHeader="Romance"
    :genre="this.getGenreName(`romance`)"
  />
  <Slider type="war" typeForHeader="War" :genre="this.getGenreName(`war`)" />
  <Slider
    type="western"
    typeForHeader="Western"
    :genre="this.getGenreName(`western`)"
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
  methods: {
    getGenreName(name) {
      for (let i = 0; i < env.GENRES.length; i++) {
        if (name == env.GENRES[i].name) {
          return env.GENRES[i].id;
        }
      }
    },
  },
};
</script>

<style scoped></style>
