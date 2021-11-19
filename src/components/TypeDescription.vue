<template>
  <div class="slide-description">
    <h1 class="description">{{ this.typeForHeader }} Movies</h1>
    <router-link :to="'/type/' + type" class="see-all-btn"
      ><div>See all</div></router-link
    >
  </div>
</template>

<script>
export default {
  props: ["typeForHeader", "type"],
};
</script>

<style scoped>
.slide-description {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.description {
  padding: 20px 0;
  color: #fff;
}
.see-all-btn {
  color: #fff;
  margin: auto 20px;
}
@media screen and (max-width: 768px) {
  .description {
    font-size: 24px;
  }
}
</style>
