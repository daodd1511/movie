<template>
  <div class="slide-description">
    <h1 class="description">{{ this.typeForHeader }}</h1>
    <div v-if="hasType(type)" class="see-all-btn">
      <router-link :to="'/type/' + type">See all</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["typeForHeader", "type"],
  methods: {
    hasType(type) {
      return type !== "";
    },
  },
};
</script>

<style scoped>
.slide-description {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 40px;
}
.description {
  padding: 20px 0;
  color: #fff;
}
.description::first-letter{
  text-transform: capitalize;
}
.see-all-btn {
  margin: auto 20px;
}
.see-all-btn a {
  color: #fff;
}
.see-all-btn a:hover {
  color: #42b883;
}
@media screen and (max-width: 768px) {
  .description {
    font-size: 24px;
  }
}
</style>
