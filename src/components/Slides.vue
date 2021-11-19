<template>
  <div class="test">
    <swiper
      :slides-per-view="3.3"
      :space-between="15"
      :freeMode="true"
      :navigation="true"
      :slides-per-group="3.3"
      :breakpoints="{
        '768': {
          slidesPerView: 4.3,
          spaceBetween: 10,
          slidesPerGroup: 4.3,
        },
        '1024': {
          slidesPerView: 5.3,
          spaceBetween: 10,
          slidesPerGroup: 5.3,
        },
      }"
      class="test-swiper"
    >
      <!-- @swiper="onSwiper" -->
      <swiper-slide v-for="movie in movieData.value" :key="movie.id">
        <div class="movie-thumb">
          <router-link :to="'/movie/' + movie.id" class="movie-link">
            <img :src="imgurl + movie.poster_path" alt="" />
          </router-link>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// import { ref } from "vue"
// Import Swiper Component
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper Styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import NavSwiper, { Navigation } from "swiper";
NavSwiper.use([Navigation]);
import env from "@/env";
export default {
  props: ["movieData"],
  setup() {
    const imgurl = env.IMG_URL;
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    return {
      imgurl,
      onSwiper,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {},
};
</script>

<style scoped>
.test {
  color: white;
  padding: 10px;
}

.test-swiper {
  display: grid;
}
.movie-thumb {
  overflow: hidden;
  border-radius: 10px;
  height: 100%;
}
.movie-thumb img {
  height: 100%;
  max-width: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
}
</style>
