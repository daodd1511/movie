<template>
  <div class="movie-grid">
    <div class="movie-grid-item" v-for="movie in movies" :key="movie.id">
      <div class="movie-thumb">
        <img :src="imgurl + movie.poster_path" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
