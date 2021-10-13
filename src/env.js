const API_KEY = 'api_key=e52f46b354dd98e688a2253d01564503';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'http://image.tmdb.org/t/p/w300'; 
const test = {
  small: "https://image.tmdb.org/t/p/w185",
  medium: "https://image.tmdb.org/t/p/w300",
  large: "https://image.tmdb.org/t/p/w1280",
  original: "https://image.tmdb.org/t/p/original"
};
export default {
  apikey: "bd93f7f1",
  API_KEY,
  API_URL,
  BASE_URL,
  IMG_URL,
  test,
};
