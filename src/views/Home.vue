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
    <router-link :to="'/search'">
      <form @submit.prevent="getMovies(3)" class="search-box">
        <input type="text" placeholder="Search here" v-model="search" />
          <input type="submit" value="Search" />
      </form>
    </router-link>
    <h1 class="popular">Popular Movies</h1>
    <div class="movie-grid">
      <div class="movie-grid-item" v-for="movie in movies" :key="movie.id">
        <div class="movie-thumb">
          <img :src="imgurl + movie.poster_path" alt="" />
        </div>
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
import { ref, onMounted } from "vue";
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
  border-radius: 8px;
  transition: 0.4s;
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
