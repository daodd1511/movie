// eslint-disable-next-line
<template>
  <router-link :to="'/movie/' + movies[0].id" class="movie-link">
    <div
      class="hero"
      :style="{
        background: `linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%),url('${backdropurl}${movies[0].backdrop_path}'),rgb(28, 28, 28)`,
      }"
    >
      <div class="hero-content">
        <div class="hero-content-text">
          <h1>{{ movies[0].title }}</h1>
          <p>{{ movies[0].overview }}</p>
        </div>
      </div>
    </div>
  </router-link>
  <div class="home">
    <router-link :to="'/search'">
      <form @submit.prevent="getMovies(3)" class="search-box">
        <input type="text" placeholder="Search here" v-model="search" />
        <input type="submit" value="Search" />
      </form>
    </router-link>
    <h1 class="popular">Popular Movies</h1>
    <div class="movie-grid">
      <div class="movie-grid-item" v-for="movie in movies" :key="movie.id">
        <router-link :to="'/movie/' + movie.id" class="movie-link">
          <div class="movie-thumb">
            <img :src="imgurl + movie.poster_path" alt="" />
          </div>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <button @click="loadFirst">First</button>
      <button @click="loadPrev">Prev</button>
      <button @click="loadNext">Next</button>
      <button @click="loadLast">Last</button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import env from "@/env.js";
// import MovieData from "@/components/MovieData.vue";
export default {
  components: {},
  setup() {
    const search = ref("");
    const movies = ref([]);
    const imgurl = env.IMG_URL;
    const backdropurl = env.BACKDROP_URL.large;
    var pageCount = 1;
    const getMovies = (page) => {
      if (search.value == "") {
        fetch(env.API_URL + "&page=" + page)
          .then((response) => response.json())
          .then(
            (data) => ((movies.value = data.results), (pageCount = data.page))
          )
          .then((data) => console.log(data));
      }
    };
    const loadFirst = () => {
      pageCount = 1;
      getMovies(pageCount);
    };
    const loadLast = () => {
      pageCount = 500;
      getMovies(pageCount);
    };
    const loadNext = () => {
      pageCount++;
      if (pageCount > 500) {
        pageCount = 1;
      }
      getMovies(pageCount);
    };
    const loadPrev = () => {
      pageCount--;
      if (pageCount < 1) {
        pageCount = 1;
      }
      getMovies(pageCount);
    };
    onBeforeMount(() => {
      getMovies();
    });
    return {
      search,
      movies,
      imgurl,
      backdropurl,
      pageCount,
      loadNext,
      loadPrev,
      loadFirst,
      loadLast,
      getMovies,
    };
  },
};
</script>
<style scoped>
.home {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px 60px 20px;
}
.hero {
  background-size: 100%, cover !important;
  background-position: 50%, 50% !important;
  width: 100%;
  height: 600px;
  position: relative;
  -webkit-animation: animateHeroimage 1s;
  animation: animateHeroimage 1s;
}
.hero-content {
  max-width: 1280px;
  padding: 20px;
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
.hero-content h1 {
  font-size: 46px;
  font-weight: 500;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
}
.hero-content p {
  font-size: 22px;
  font-weight: 200;
  line-height: 26px;
  color: #fff;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.search-box {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.search-box input {
  display: block;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.search-box input[type="text"] {
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #1c1c1c;
  font-size: 20px;
  padding: 10px 16px;
  transition: 0.4s;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.search-box input::placeholder {
  color: #f3f3f3;
}
.search-box input:focus {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}
.search-box input[type="submit"] {
  width: 120px;
  height: 60px;
  background-color: #42b883;
  color: #fff;
  border: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer;
  font-size: 16px;
  right: 0;
}
.search-box input:active {
  background-color: #3b8070;
}

.popular {
  height: 100px;
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
}
.movie-grid-item {
  margin-bottom: 40px;
  background: #353535;
  max-height: 430px;
  -webkit-animation: animateGrid 0.5s;
  animation: animateGrid 0.5s;
  overflow: hidden;
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
