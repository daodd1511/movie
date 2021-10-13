<template>
  <div class="home">
    <!-- <div class="hero">
      <img
        :src="backdropurl + movies[0].backdrop_path"
        alt="Hero Image"
        class="hero-img"
      />
      <div class="hero-content">
        <h1>{{ movies[0].title }}</h1>
        <p>{{ movies[0].overview }}</p>
      </div>
    </div> -->
    <form @submit.prevent="searchMovies()" class="search-box">
      <input type="text" placeholder="Search here" v-model="search" />
      <input type="submit" value="search" />
    </form>
    <h1 class="popular">Popular Movies</h1>
    <div class="movie-grid">
      <div class="movie-grid-item" v-for="movie in movies" :key="movie.id">
        <div class="movie-thumb">
          <img :src="imgurl + movie.poster_path" alt="" />
        </div>
      </div>
    </div>
    <button @click="loadFirst">Load First</button>
    <button @click="loadPrev">Load Previous</button>
    <button @click="loadNext">Load Next</button>
    <button @click="loadLast">Load Last</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import env from "@/env.js";
// import MovieData from "@/components/MovieData.vue";
export default {
  components: {},
  setup() {
    const search = ref("");
    const movies = ref([]);
    const imgurl = env.IMG_URL;
    const backdropurl = env.test.large;
    var pageCount = 1;
    const getMovies = (page) => {
      // fetch(env.API_URL)
      //   .then((response) => response.json())
      //   .then((data) => (movies.value = data.results))
      //   .then(() => console.log(movies.value));
      fetch(env.API_URL + "&page=" + page)
        .then((response) => response.json())
        .then(
          (data) => ((movies.value = data.results), (pageCount = data.page))
        )
        .then((data) => console.log(data));
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
    onMounted(() => {
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
    };
  },
};
</script>
<style scoped>
.home{
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px 60px 20px;
}
.search-box {
  height: 100px;
}
.popular {
  height: 100px;
}
button {
  height: 30px;
  width: 50px;
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
@media screen and (max-width: 720px){
  .movie-grid {
      grid-template-columns: auto auto;
  }
}
</style>
