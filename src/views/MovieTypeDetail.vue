<template>
  <div class="home">
    <h1 class="heading">{{ headType }}</h1>
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
  setup() {
    const route = useRoute();
    const headType = ref(route.params.type);
    headType.value = headType.value.replace("_", " ");
    return {
      headType,
      route,
    };
  },
  data() {
    return {
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

<style scoped>
.heading {
  color: #fff;
  padding: 20px;
  padding-top: 40px;
}
.heading::first-letter {
  text-transform: capitalize;
}
@media screen and (max-width: 768px) {
  .heading {
    font-size: 24px;
  }
}
</style>
