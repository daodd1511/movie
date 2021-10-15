<template>
  <div
    class="movieinfo"
    :style="{ background: `url('${backdropurl}${movie.backdrop_path}')` }"
  >
    <div class="movieinfo-container">
      <div class="movie-rating"></div>
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
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";

export default {
  methods: {
    reverseDate(date) {
      date = date.split("-").reverse().join("-");
      return date;
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
    const route = useRoute();
    const backdropurl = env.BACKDROP_URL.large;
    const imgurl = env.BACKDROP_URL.overmedium;
    onBeforeMount(() => {
      fetch(env.BASE_URL + "/movie/" + route.params.id + "?" + env.API_KEY)
        .then((response) => response.json())
        .then((data) => (movie.value = data))
        .then((data) => console.log(data));
    });
    return {
      movie,
      backdropurl,
      imgurl,
    };
  },
};
</script>

<style scoped>
.movieinfo {
  font-family: "Be Vietnam Pro", sans-serif;
}
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
</style>
