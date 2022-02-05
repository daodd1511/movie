import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieDetail from "../views/MovieDetail.vue";
import Search from "../views/Search.vue";
import HomeV1 from "../views/HomeV1.vue";
import MovieTypeDetail from "../views/MovieTypeDetail.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie/:id",
    name: "Movie Detail",
    component: MovieDetail,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/v1",
    name: "Home V1",
    component: HomeV1,
  },
  {
    path: "/type/:type",
    name: "Type Detail",
    component: MovieTypeDetail,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  document.title = to.name;
});

export default router;
