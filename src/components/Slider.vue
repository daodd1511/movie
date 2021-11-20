<template>
  <div class="container">
    <TypeDescription
      :type="type"
      :typeForHeader="typeForHeader"
    ></TypeDescription>
    <Slides :movieData="movies"></Slides>
  </div>
</template>

<script>
import env from "@/env.js";
import { ref } from "vue";
import Slides from "@/components/Slides.vue";
import TypeDescription from "@/components/TypeDescription.vue";
export default {
  props: ["type", "typeForHeader", "genre"],
  components: { Slides, TypeDescription },
  data() {
    return {
      movies: ref([]),
      genresData: ref([]),
      page: 1,
    };
  },
  computed: {},
  methods: {
    getMovieData() {
      if (this.genre == "") {
        fetch(
          `https://api.themoviedb.org/3/movie/${this.type}?${env.API_KEY}&page=${this.page}`
        )
          .then((response) => response.json())
          .then((data) => (this.movies.value = data.results));
      } else {
        fetch(
          `https://api.themoviedb.org/3/discover/movie?${env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.genre}`
        )
          .then((response) => response.json())
          .then((data) => (this.movies.value = data.results));
      }
    },
  },
  beforeMount() {
    this.getMovieData();
  },
};
</script>

<style scoped></style>
