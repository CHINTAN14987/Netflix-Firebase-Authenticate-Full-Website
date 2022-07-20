import React, { useEffect, useState } from "react";
import {
  TrendingRequests,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovie,
  fetchComedyMovie,
  fetchHorrorMovie,
  fetchRomanceMovie,
} from "../requests";
const Search = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const promise = await Promise.all([
        fetch(TrendingRequests),
        fetch(fetchNetflixOriginals),
        fetch(fetchActionMovie),
        fetch(fetchTopRated),
        fetch(fetchComedyMovie),
        fetch(fetchHorrorMovie),
        fetch(fetchRomanceMovie),
        fetch(fetchTopRated),
      ]);

      const data = await Promise.all(
        promise.map((response) => {
          return response.json();
        })
      );
      return data;
    };
    fetchData().then((r) => {
      console.log(r);
      setMovies(r);
    });
  }, []);
  return <div>{console.log(movies)}</div>;
};

export default Search;
