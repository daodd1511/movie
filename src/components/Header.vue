<template>
  <header>
    <router-link to="/">
      <h1><span>Vue</span>Movies</h1>
    </router-link>
    <router-link :to="'/search'">
      <div class="search-btn">
        <i class="fas fa-search"></i>
      </div>
    </router-link>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  background-color: #1c1c1c;
  height: 5rem;
  top: 0;
  right: 0;
  left: 0;
  transition: all 0.4s;
}
header h1 {
  color: #fff;
  font-size: 32px;
}
header h1 span {
  color: #42b883;
}
.search-btn {
  color: #42b883;
  font-size: 24px;
  padding-right: 20px;
}
@media screen and (max-width: 600px) {
  header {
    padding: 25px;
  }
  header h1 {
    font-size: 30px;
  }
  .search-btn {
    padding: 0;
    font-size: 25px;
  }
}
</style>
