/* eslint-disable prettier/prettier */
<template>
  <header>
    <router-link to="/">
      <h1><span>Vue</span>Movies</h1>
    </router-link>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;200;300;400;500;600&display=swap');
@import url('https://use.fontawesome.com/releases/v5.13.0/css/all.css');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Be Vietnam Pro', sans-serif;
}
*::selection {
  background: transparentize(#42b883, 0.5);
}

body {
}
a {
  text-decoration: none;
}
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: #1c1c1c;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  height: 80px;
}
header h1 {
  color: #fff;
  font-size: 28px;
}
header h1 span {
  color: #42b883;
}
</style>
