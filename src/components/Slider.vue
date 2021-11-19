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
  props: ["type", "typeForHeader"],
  components: { Slides, TypeDescription },
  data() {
    return {
      movies: ref([]),
      page: 1,
    };
  },
  computed: {},
  methods: {
    getMovieData() {
      fetch(
        `https://api.themoviedb.org/3/movie/${this.type}?${env.API_KEY}&page=${this.page}`
      )
        .then((response) => response.json())
        .then((data) => (this.movies.value = data.results));
    },
  },
  beforeMount() {
    this.getMovieData();
  },
};
</script>

<style scoped>

</style>
