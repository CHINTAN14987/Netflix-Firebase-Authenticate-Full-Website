const API_KEY = "919bd094f6efdd25c2917fdc4aeae4d9";
export const TrendingRequests = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
export const fetchNetflixOriginals = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_networks=213`;
export const fetchTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;
export const fetchActionMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`;
export const fetchComedyMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`;
export const fetchHorrorMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`;
export const fetchRomanceMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`;
