import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../css/Detail.css";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import {
  TrendingRequests,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchComedyMovie,
  fetchHorrorMovie,
} from "../requests";
import youtubeApi from "./youtubeApi";
import YouTube from "react-youtube";
import Row from "./Row";

const Detail = () => {
  const [allMovies, setallMovies] = useState([]);

  const location = useLocation();
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await youtubeApi.get("/search", {
        params: {
          q: `${location?.state.title}trailer ${location?.state.first_air_date}`,
        },
      });
      console.log(response.data);
      return response.data.items[0].id.videoId;
    };
    fetchData().then((response) => {
      console.log(response);
      setallMovies(response);
    });
  }, [location]);

  return (
    <>
      {console.log(allMovies)}
      {allMovies.length > 0 && <YouTube videoId={allMovies} opts={opts} />}
      <div>
        <Row title="Trending" apiRequest={TrendingRequests} />
        <Row title="Netflix Originals" apiRequest={fetchNetflixOriginals} />
        <Row title="Top Rated Movies" apiRequest={fetchTopRated} />
        <Row title="Comedy Movies" apiRequest={fetchComedyMovie} />
        <Row title="Horror Movies" apiRequest={fetchHorrorMovie} />
      </div>
    </>
  );
};

export default Detail;
