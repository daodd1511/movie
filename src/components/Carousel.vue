<template>
  <div class="carousel-container">
    <swiper
      :slide-per-view="1"
      :navigation="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :loop="true"
      class="carousel"
    >
      <swiper-slide v-for="feature in features.value" :key="feature.id">
        <div
          class="hero"
          :style="{
            background: `linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%),url('${
              this.featureURL
            }${
              isMobile ? feature.poster_path : feature.backdrop_path
            }'),rgb(28, 28, 28)`,
          }"
        >
          <div class="hero-content">
            <div class="hero-content-text">
              <h1>
                <router-link :to="'/movie/' + feature.id" class="movie-link">
                  <span>{{ feature.title }}</span>
                </router-link>
              </h1>
              <p>{{ feature.overview }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper Styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import NavSwiper, { Navigation, Autoplay } from "swiper";
NavSwiper.use([Navigation, Autoplay]);
import env from "@/env";
export default {
  props: ["type"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      featureURL: env.BACKDROP_URL.large,
      features: ref([]),
      page: 1,
      isMobile: false,
    };
  },
  methods: {
    getFeatureData() {
      fetch(
        `https://api.themoviedb.org/3/movie/${this.type}?${env.API_KEY}&page=${this.page}`
      )
        .then((response) => response.json())
        .then((data) => (this.features.value = data.results));
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    mobileBreakpoint() {
      this.isMobile = window.innerWidth < 600;
    },
  },
  beforeMount() {
    this.getFeatureData();
  },
  beforeUnmount() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.mobileBreakpoint, {
      passive: true,
    });
  },
  mounted() {
    this.mobileBreakpoint();
    window.addEventListener("resize", this.mobileBreakpoint, { passive: true });
  },
};
</script>

<style scoped>
.hero {
  background-size: 150%, cover !important;
  background-position: 50%, 50% !important;
  height: 100%;
  cursor: move;
}
.carousel {
  height: 600px;
  overflow-x: hidden;
}
.hero-content {
  max-width: 1280px;
  padding: 20px 50px;
  margin: 0 auto;
}
.hero-content-text {
  z-index: 100;
  max-width: 700px;
  position: absolute;
  bottom: 40px;
  margin-right: 20px;
  min-height: 100px;
  background: transparent;
  color: #fff;
}
.hero-content h1 span {
  font-size: 46px;
  font-weight: 500;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  /* text-decoration: none; */
  color: #fff;
  user-select: none;
}
.hero-content h1 span:hover {
  color: #42b883;
}
.hero-content p {
  font-size: 22px;
  font-weight: 200;
  line-height: 26px;
  color: #fff;
  margin-block-start: 1em;
  margin-block-end: 1em;
  user-select: none;
}
@media screen and (max-width: 720px) {
  .hero-content-text h1 span {
    font-size: 36px;
  }
  .hero-content-text p {
    font-size: 16px;
  }
  .hero-content {
    padding: 20px;
  }
}
</style>
