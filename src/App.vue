/* eslint-disable prettier/prettier */
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
  <main>
    <router-view />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;200;300;400;500;600&display=swap");
@import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Be Vietnam Pro", sans-serif;
}
*::selection {
  background: transparentize(#42b883, 0.5);
}
html {
  scroll-behavior: smooth;
}
body {
  background-color: #111;
}
a {
  text-decoration: none;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  background-color: #1c1c1c;
  height: 100px;
}
header h1 {
  color: #fff;
  font-size: 38px;
}
header h1 span {
  color: #42b883;
}
main{
  padding-bottom: 20px;
}
.search-btn {
  color: #42b883;
  font-size: 28px;
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
