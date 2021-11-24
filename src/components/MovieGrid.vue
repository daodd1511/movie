<template>
  <div class="movie-grid">
    <div
      class="movie-grid-item"
      v-for="movie in this.movies.value"
      :key="movie.id"
    >
      <router-link :to="'/movie/' + movie.id" class="movie-link">
        <div class="movie-thumb">
          <img :src="imgurl + movie.poster_path" alt="" />
        </div>
      </router-link>
      <div class="movie-content">
        <div
          class="rating"
          :style="{
            color: getColor(movie.vote_average),
            border: `3px solid ${getColor(movie.vote_average)}`,
          }"
        >
          <div class="score">
            {{ roundedVote(movie.vote_average) }}
          </div>
        </div>
        <router-link :to="'/movie/' + movie.id" class="movie-link">
          <h2>{{ movie.title }}</h2>
        </router-link>
        <p>{{ dayConverter(movie.release_date) }}</p>
      </div>
    </div>
  </div>
  <div v-if="hasID(this.id)" class="pagination">
    <button @click="loadFirst">First</button>
    <button @click="loadPrev">Prev</button>
    <button @click="loadNext">Next</button>
    <button @click="loadLast">Last</button>
  </div>
</template>

<script>
import env from "@/env.js";
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  props: ["type", "typeForHeader", "id"],
  data() {
    return {
      route: useRoute(),
      movies: ref([]),
      pageCount: 1,
      imgurl: env.IMG_URL,
      isGenre: false,
    };
  },
  methods: {
    getMovieData(page) {
      this.getGenreID();
      if (this.isGenre) {
        fetch(
          `https://api.themoviedb.org/3/discover/movie?${
            env.API_KEY
          }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.getGenreID()}&page=${page}`
        )
          .then((response) => response.json())
          .then((data) => (this.movies.value = data.results));
      } else {
        fetch(
          `https://api.themoviedb.org/3/movie/${
            this.id != ""
              ? this.id + "/recommendations"
              : this.route.params.type
          }?${env.API_KEY}&page=${page}`
        )
          .then((response) => response.json())
          .then((data) => (this.movies.value = data.results));
      }
    },
    getColor(score) {
      var colors = { green: "#02c40c", yellow: "#e8d616", red: "#d20" };
      if (score >= 7) {
        return colors.green;
      } else if (score >= 5) {
        return colors.yellow;
      } else {
        return colors.red;
      }
    },
    dayConverter(date) {
      var options = { year: "numeric", month: "short", day: "numeric" };
      var result = new Date(date).toLocaleString("en-US", options);
      return result;
    },
    loadFirst() {
      this.pageCount = 1;
      this.getMovieData(this.pageCount);
      window.scrollTo(0, 0);
    },
    loadLast() {
      this.pageCount = 500;
      this.getMovieData(this.pageCount);
      window.scrollTo(0, 0);
    },
    loadNext() {
      this.pageCount++;
      if (this.pageCount > 500) {
        this.pageCount = 1;
      }
      this.getMovieData(this.pageCount);
      window.scrollTo(0, 0);
    },
    loadPrev() {
      this.pageCount--;
      if (this.pageCount < 1) {
        this.pageCount = 1;
      }
      this.getMovieData(this.pageCount);
      window.scrollTo(0, 0);
    },
    getGenreID() {
      const genre = this.route.params.type;
      for (let i = 0; i < env.GENRES.length - 1; i++) {
        if (genre == env.GENRES[i].name) {
          this.isGenre = true;
          return env.GENRES[i].id;
        }
      }
    },
    roundedVote(vote) {
      return vote.toFixed(1);
    },
    hasID(id) {
      return id === "";
    },
  },
  beforeMount() {
    this.getMovieData(this.pageCount);
  },
};
</script>

<style scoped>
.popular {
  padding: 40px 0;
  color: #fff;
}
button {
  width: 80px;
  height: 40px;
  background-color: #42b883;
  color: #fff;
  border: 0;
  border-radius: 60px;
  cursor: pointer;
  font-size: 16px;
}
.movie-grid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 40px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}
.movie-grid-item {
  margin-bottom: 40px;
  background: #242424;
  -webkit-animation: animateGrid 0.5s;
  animation: animateGrid 0.5s;
  overflow: hidden;
  border-radius: 10px;
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
.movie-content {
  color: #fff;
  padding: 20px;
  position: relative;
}
.movie-content .rating {
  position: absolute;
  top: -22px;
  left: 15px;
  background-color: #f7f7f7;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
}
.movie-content h2 {
  font-size: 18px;
  font-weight: 600;
  padding: 10px 0 10px 0;
  text-decoration: none;
  color: #fff;
}
.movie-content h2:hover {
  color: #42b883;
}
.movie-content p {
  font-size: 14px;
  font-weight: 300;
}
.pagination {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  grid-column-gap: 20px;
}
@media screen and (max-width: 720px) {
  .movie-grid {
    grid-template-columns: auto auto;
  }
  button {
    width: 70px;
    height: 30px;
    font-size: 13px;
  }
}
</style>
