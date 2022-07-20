import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
import { useLocation } from "react-router-dom";
import "../css/Search.css";

const Search = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    setSearchMovies(location?.state?.results);
  }, [location]);
  return (
    <>
      {console.log(location)}
      {searchMovies ? (
        <div className="serach_Container">
          <div className="flex_Wrapper_Search">
            {searchMovies.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          ;
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
>>>>>>> 7187f83d1d89212e2207efd258e59774c8a06a99
};

export default Search;
