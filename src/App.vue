/* eslint-disable prettier/prettier */
<template>
  <Header v-if="!$route.params.pathMatch && $route.path != '/'" />
  <main>
    <router-view :key="$route.path" />
  </main>
  <Footer v-if="!$route.params.pathMatch" />
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

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
main {
  padding-bottom: 20px;
  padding-top: 5rem;
}
</style>
