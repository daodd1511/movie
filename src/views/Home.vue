// eslint-disable-next-line
<template>
  <div class="carousel-container">
    <div
      class="carousel"
      v-for="slide in slides"
      :key="slide"
      :visibleSlide="visibleSlide"
      :direction="direction"
    >
      <transition :name="direction" mode="in-out">
        <div
          v-show="visibleSlide === slide"
          class="hero"
          :style="{
            background: `linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%),url('${backdropurl}${movies[slide].backdrop_path}'),rgb(28, 28, 28)`,
          }"
        >
          <div class="hero-content">
            <div class="hero-content-text">
              <router-link
                :to="'/movie/' + movies[slide].id"
                class="movie-link"
              >
                <h1>{{ movies[slide].title }}</h1>
              </router-link>
              <p>{{ movies[slide].overview }}</p>
            </div>
          </div>
          <div class="nextSlide" @click="nextSlide">
            <i class="fas fa-chevron-right"></i>
          </div>
          <div class="prevSlide" @click="prevSlide">
            <i class="fas fa-chevron-left"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <div class="home">
    <h1 class="popular">Popular Movies</h1>
    <div class="movie-grid">
      <div class="movie-grid-item" v-for="movie in movies" :key="movie.id">
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
              {{ movie.vote_average }}
            </div>
          </div>
          <h2>{{ movie.title }}</h2>
          <p>{{ dayConverter(movie.release_date) }}</p>
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
import { ref, onBeforeMount } from "vue";
import env from "@/env.js";
export default {
  data() {
    return {
      slides: [0, 1, 2, 3, 4],
      visibleSlide: 0,
      direction: "",
    };
  },
  computed: {
    slideLen() {
      return this.slides.length;
    },
  },
  methods: {
    nextSlide() {
      if (this.visibleSlide >= this.slideLen - 1) {
        this.visibleSlide = 0;
      } else {
        this.visibleSlide++;
      }
      this.direction = "left";
    },
    prevSlide() {
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.slideLen - 1;
      } else {
        this.visibleSlide--;
      }
      this.direction = "right";
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
  },
  setup() {
    const search = ref("");
    const movies = ref([]);
    const features = ref([]);
    const imgurl = env.IMG_URL;
    const backdropurl = env.BACKDROP_URL.large;
    var pageCount = 1;
    const getMovies = (page) => {
      if (search.value == "") {
        fetch(env.API_URL + "&page=" + page)
          .then((response) => response.json())
          .then(
            (data) => (
              (movies.value = data.results),
              (pageCount = data.page),
              console.log(movies.value)
            )
          );
      }
    };
    const loadFirst = () => {
      pageCount = 1;
      getMovies(pageCount);
      window.scrollTo(0, 0);
    };
    const loadLast = () => {
      pageCount = 500;
      getMovies(pageCount);
      window.scrollTo(0, 0);
    };
    const loadNext = () => {
      pageCount++;
      if (pageCount > 500) {
        pageCount = 1;
      }
      getMovies(pageCount);
      window.scrollTo(0, 0);
    };
    const loadPrev = () => {
      pageCount--;
      if (pageCount < 1) {
        pageCount = 1;
      }
      getMovies(pageCount);
      window.scrollTo(0, 0);
    };
    onBeforeMount(() => {
      getMovies();
    });
    return {
      search,
      movies,
      features,
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
.carousel-container {
  height: 600px;
  position: relative;
  overflow-x: hidden;
}
.hero {
  background-size: 100%, cover !important;
  background-position: 50%, 50% !important;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* -webkit-animation: animateHeroimage 1s;
  animation: animateHeroimage 1s; */
}
.hero .nextSlide,
.prevSlide {
  position: absolute;
  top: 0;
  height: 100%;
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  width: 50px;
  justify-content: center;
  cursor: pointer;
}

.hero .nextSlide {
  right: 0;
}
.hero .prevSlide {
  left: 0;
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
  /* text-decoration: none; */
  color: #fff;
}
.hero-content h1:hover {
  color: #42b883;
}
.hero-content p {
  font-size: 22px;
  font-weight: 200;
  line-height: 26px;
  color: #fff;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
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
}
.movie-grid-item {
  margin-bottom: 40px;
  background: #242424;
  max-height: 630px;
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
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  grid-column-gap: 20px;
}

.left-enter-active {
  animation: leftInAnimation 0.6s ease-in-out;
}
.left-leave-active {
  animation: leftOutAnimation 0.6s ease-in-out;
}
.right-enter-active {
  animation: rightInAnimation 0.6s ease-in-out;
}
.right-leave-active {
  animation: rightOutAnimation 0.6s ease-in-out;
}
/* Animation */
@keyframes leftInAnimation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes leftOutAnimation {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes rightInAnimation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes rightOutAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
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
