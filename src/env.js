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
const GENRES = [
  { id: 28, name: "action" },
  { id: 12, name: "adventure" },
  { id: 16, name: "animation" },
  { id: 35, name: "comedy" },
  { id: 80, name: "crime" },
  { id: 99, name: "documentary" },
  { id: 18, name: "drama" },
  { id: 10751, name: "family" },
  { id: 14, name: "fantasy" },
  { id: 36, name: "history" },
  { id: 27, name: "horror" },
  { id: 10402, name: "music" },
  { id: 9648, name: "mystery" },
  { id: 10749, name: "romance" },
  { id: 878, name: "science Fiction" },
  { id: 10770, name: "TVmovie" },
  { id: 53, name: "thriller" },
  { id: 10752, name: "war" },
  { id: 37, name: "western" },
];
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
