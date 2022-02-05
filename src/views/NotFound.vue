<template>
  <section class="page_404">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-10 col-sm-offset-1 text-center">
            <h1 class="text-center title">404</h1>
            <div class="four_zero_four_bg"></div>
            <div class="contant_box_404">
              <h3 class="h2">Look like you're lost</h3>
              <p>the page you are looking for not avaible!</p>
              <a href="/" class="link_404">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
<style scoped>
/*======================
    404 page
=======================*/
@import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css";
@import url("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;300;400;500;600;700&display=swap");
.page_404 {
  background: #fff;
  font-family: "Be Vietnam Pro", sans-serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url("https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif");
  height: 400px;
  background-position: center;
}

.title {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 10px 0;
  display: inline-block;
}
.contant_box_404 {
  margin-top: -50px;
}
</style>
