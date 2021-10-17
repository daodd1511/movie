<template>
  <div class="home">
    <form
      @submit.prevent="searchMovies(pageCount)"
      class="search-box"
      @submit="isSubmitted = true"
    >
      <input type="text" placeholder="Search here" v-model="search" />
      <input type="submit" value="Search" />
    </form>
    <h1 class="popular" v-if="isSubmitted">Search Results</h1>
    <div class="movie-grid">
      <div class="movie-grid-item" v-for="movie in movies" :key="movie.id">
        <router-link :to="'/movie/' + movie.id" class="movie-link">
          <div class="movie-thumb">
            <img
              v-if="movie.poster_path != null"
              :src="imgurl + movie.poster_path"
              alt="Movie Image"
            />
            <img v-else, src="@/assets/no_image.jpg" alt="Movie Image" />
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
              {{ movie.vote_average }}
            </div>
          </div>
          <h2>{{ movie.title }}</h2>
          <p>{{ dayConverter(movie.release_date) }}</p>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="isSubmitted">
      <button @click="loadFirst">First</button>
      <button @click="loadPrev">Prev</button>
      <button @click="loadNext">Next</button>
      <button @click="loadLast">Last</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import env from "@/env.js";
// import MovieData from "@/components/MovieData.vue";
export default {
  data() {
    return {
      isSubmitted: false,
    };
  },
  methods: {
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
  },
  setup() {
    const search = ref("");
    const movies = ref([]);
    const imgurl = env.IMG_URL;
    const backdropurl = env.BACKDROP_URL.large;
    var totalpage = 0;
    var pageCount = 1;
    const searchMovies = (page, query) => {
      if (search.value == "") {
        search.value = query;
      }
      if (search.value != "") {
        fetch(
          env.SEARCH_URL +
            "page=" +
            page +
            "&query=" +
            search.value +
            "&" +
            env.API_KEY
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value = data.results;
            totalpage = data.total_pages;
            // console.log(totalpage);
            // console.log(data);
          });
      }
    };
    const loadFirst = () => {
      pageCount = 1;
      searchMovies(pageCount, search.value);
      window.scrollTo(0,0);
    };
    const loadLast = () => {
      pageCount = totalpage;
      searchMovies(pageCount, search.value);
      window.scrollTo(0,0);
    };
    const loadNext = () => {
      if (pageCount < totalpage) {
        pageCount++;
      }
      searchMovies(pageCount, search.value);
      window.scrollTo(0,0);
    };
    const loadPrev = () => {
      pageCount--;
      if (pageCount < 1) {
        pageCount = 1;
      }
      searchMovies(pageCount, search.value);
      window.scrollTo(0,0);
    };
    return {
      search,
      movies,
      imgurl,
      backdropurl,
      pageCount,
      totalpage,
      loadNext,
      loadPrev,
      loadFirst,
      loadLast,
      searchMovies,
    };
  },
};
</script>
<style scoped>
.hidden {
  display: none;
}
.home {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px 60px 20px;
  color: #fff;
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
  position: absolute;
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
  max-height: 800px;
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
}
.movie-content p {
  font-size: 14px;
  font-weight: 300;
}
.pagination {
  display: grid !important;
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
