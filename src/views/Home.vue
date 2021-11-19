<template>
  <Carousel type="popular"></Carousel>
  <Slider type="popular" typeForHeader="Popular"> </Slider>
  <Slider type="top_rated" typeForHeader="Top Rated"> </Slider>
  <Slider type="now_playing" typeForHeader="Now Playing"> </Slider>
  <Slider type="upcoming" typeForHeader="Upcoming"> </Slider>
</template>

<script>
import Slider from "@/components/Slider.vue";
import Carousel from "@/components/Carousel.vue";
export default {
  components: { Slider, Carousel },
};
</script>

<style scoped></style>
