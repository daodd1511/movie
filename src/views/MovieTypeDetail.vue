<template>
  <div class="home">
    <!-- <h1 class="popular">Popular Movies</h1> -->
    <MovieGrid :type="type" :typeForHeader="typeForHeader" id="" />
  </div>
</template>
<script>
import env from "@/env.js";
import { ref } from "vue";
import { useRoute } from "vue-router";
import MovieGrid from "@/components/MovieGrid.vue";
export default {
  props: ["type", "typeForHeader"],
  components: { MovieGrid },
  data() {
    return {
      route: useRoute(),
      movies: ref([]),
      pageCount: 1,
      imgurl: env.IMG_URL,
      isGenre: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
