const API_KEY = "api_key=e52f46b354dd98e688a2253d01564503";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "http://image.tmdb.org/t/p/w300";
const BACKDROP_URL = {
  extrasmall: "http://image.tmdb.org/t/p/w154",
  small: "https://image.tmdb.org/t/p/w185",
  medium: "https://image.tmdb.org/t/p/w300",
  overmedium: "https://image.tmdb.org/t/p/w500",
  large: "https://image.tmdb.org/t/p/w1280",
  original: "https://image.tmdb.org/t/p/original",
};
const GENRES = {
  animation : 16,
  history : 36,
  drama : 18,
  horror : 27,
  music : 10402,
  science : 878,
  length : 6,
}
const SEARCH_URL = BASE_URL + "/search/movie?";
export default {
  apikey: "bd93f7f1",
  API_KEY,
  API_URL,
  BASE_URL,
  IMG_URL,
  BACKDROP_URL,
  SEARCH_URL,
  GENRES,
};
