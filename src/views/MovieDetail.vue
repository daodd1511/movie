<template>
  <div
    class="movieinfo"
    :style="{ background: `url('${backdropurl}${movie.backdrop_path}')` }"
  >
    <div class="movieinfo-container">
      <div class="movieinfo-thumbnail">
        <div class="movie-thumb">
          <img :src="imgurl + movie.poster_path" alt="Movie Poster" />
        </div>
      </div>
      <div class="movieinfo-content">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <div class="movie-overview">
          <h4>OVERVIEW</h4>
          <p>{{ movie.overview }}</p>
        </div>
        <div class="movie-genres">
          <h4>GENRES</h4>
          <div class="genres">
            <div v-for="genre in movie.genres" :key="genre.id">
              <p>{{ genre.name }}</p>
            </div>
          </div>
        </div>
        <div class="movie-stats">
          <div class="movie-release stat">
            <i class="far fa-calendar-alt"></i>
            Release date: {{ reverseDate(movie.release_date) }}
          </div>
          <div class="movie-budget stat">
            <i class="far fa-money-bill-alt"></i>
            Budget: ${{ moneySeperator(movie.budget) }}
          </div>
          <div class="movie-duration stat">
            <i class="far fa-clock"></i>
            Duration: {{ timeConverter(movie.runtime) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="actor-grid">
    <h1>Actors</h1>
    <swiper
      :navigation="true"
      :slides-per-view="2.3"
      :space-between="20"
      :freeMode="true"
      :slides-per-group="2"
      :breakpoints="{
        '768': {
          slidesPerView: 4.3,
          spaceBetween: 20,
          slidesPerGroup: 4,
        },
        '1024': {
          slidesPerView: 6.3,
          spaceBetween: 20,
          slidesPerGroup: 6,
        },
      }"
      class="actor-grid-content"
    >
      <swiper-slide
        class="actor-grid-item"
        v-for="actor in actors"
        :key="actor.cast_id"
      >
        <img
          v-if="actor.profile_path != null"
          :src="actorurl + actor.profile_path"
          alt="Actor Image"
          class="actor-image"
        />
        <img
          v-else,
          src="@/assets/no_image.jpg"
          alt="Actor Image"
          class="actor-image"
        />
        <div class="actor-name">{{ actor.name }}</div>
        <div class="actor-character">{{ actor.character }}</div>
      </swiper-slide>
    </swiper>
  </div>

  <TypeDescription type="" typeForHeader="Recommend" />
  <MovieGrid type="" typeForHeader="" :id="movieID" />
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";
// Import Swiper Component
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper Styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import NavSwiper, { Navigation } from "swiper";
import MovieGrid from "@/components/MovieGrid.vue";
import TypeDescription from "@/components/TypeDescription.vue";
NavSwiper.use([Navigation]);
export default {
  components: {
    Swiper,
    SwiperSlide,
    MovieGrid,
    TypeDescription,
  },
  methods: {
    reverseDate(date) {
      return date.split("-").reverse().join("-");
    },
    moneySeperator(money) {
      money = money.toLocaleString();
      return money;
    },
    timeConverter(time) {
      var hours = time / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + "h " + rminutes + "m";
    },
  },
  setup() {
    const movie = ref({});
    const actors = ref([]);
    const route = useRoute();
    const movieID = route.params.id;
    const backdropurl = env.BACKDROP_URL.large;
    const imgurl = env.BACKDROP_URL.overmedium;
    const actorurl = env.BACKDROP_URL.extrasmall;
    onBeforeMount(() => {
      fetch(env.BASE_URL + "/movie/" + movieID + "?" + env.API_KEY)
        .then((response) => response.json())
        .then((data) => (movie.value = data));
      fetch(env.BASE_URL + "/movie/" + movieID + "/credits?" + env.API_KEY)
        .then((response) => response.json())
        .then((data) => (actors.value = data.cast));
    });
    return {
      movie,
      backdropurl,
      imgurl,
      actors,
      actorurl,
      movieID,
    };
  },
};
</script>

<style scoped>
h4 {
  padding-bottom: 20px;
  font-size: 18px;
}
.movieinfo {
  background-size: cover !important;
  background-position: 50% !important;
  width: 100%;
  height: 600px;
  padding: 40px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-animation: animateMovieinfo 1s;
  animation: animateMovieinfo 1s;
}
.movieinfo-container {
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  border-radius: 10px;
}
.movieinfo-thumbnail,
.movieinfo-content {
  height: 100%;
  overflow: hidden;
  position: absolute;
}
.movieinfo-thumbnail {
  width: 350px;
  left: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.movie-thumb img {
  width: 500px;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.movieinfo-content {
  width: auto;
  padding: 40px;
  color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  left: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.movie-title {
  font-size: 48px;
  font-weight: 500;
}
.movie-overview p {
  font-size: 18px;
  line-height: 26px;
  font-weight: 200;
}

.genres {
  display: flex;
  flex-direction: row;
  list-style-type: none;
}
.genres p {
  padding-right: 20px;
  font-size: 18px;
  font-weight: 200;
}
.movie-stats {
  display: flex;
  gap: 40px;
  font-size: 18px;
  font-weight: 400;
}
.movie-stats i {
  padding-right: 10px;
  font-size: 24px;
}
.stat {
  display: flex;
}

.actor-grid {
  color: #111;
  padding: 20px 20px;
}
.actor-grid h1 {
  font-size: 36px;
  font-weight: 500;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  color: #fff !important;
}
.actor-grid-content {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  column-gap: 40px;
  row-gap: 40px;
}
.actor-grid-item {
  background: #242424;
  /* max-height: 430px; */
  animation: animateGrid 0.5s;
  overflow: hidden;
  color: #fff;
  border-radius: 10px;
}
.actor-image {
  width: 100%;
}
.actor-name {
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  padding: 10px 5px;
}
.actor-character {
  font-size: 16px;
  font-weight: 200;
  text-align: center;
  padding: 0 5px 10px 5px;
}

@keyframes animateMovieinfo {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes animateGrid {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media screen and (max-width: 720px) {
  .actor-grid-content {
    grid-template-columns: auto auto !important;
  }
}
@media screen and (max-width: 1024px) {
  .actor-grid-content {
    grid-template-columns: auto auto auto auto;
  }
  .movie-title {
    font-size: 38px;
  }
  h4 {
    padding-bottom: 10px;
  }
  h4,
  p,
  .movie-stats {
    font-size: 16px !important;
  }
  .movieinfo-content,
  .movieinfo-thumbnail {
    position: initial;
  }
  .movieinfo {
    height: 100%;
  }
  .movieinfo-container {
    max-width: 500px;
  }
  .movieinfo-content {
    gap: 30px;
  }
  .movieinfo-thumbnail {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .genres {
    flex-wrap: wrap;
    row-gap: 5px;
  }
  .movie-stats {
    flex-direction: column;
    gap: 20px;
  }
  .movie-stats i {
    min-width: 50px;
    text-align: center;
  }
}
</style>
