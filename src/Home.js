import React, { useEffect } from "react";
import "./css/Home.css";
import Row from "./components/Row";
import {
  TrendingRequests,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchComedyMovie,
  fetchHorrorMovie,
  fetchRomanceMovie,
  fetchActionMovie,
} from "./requests";
import Banner from "./components/Banner";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isAuth = localStorage.getItem("token");
    if (isAuth !== null) {
      navigate("/home");
    }
  }, []); // eslint-disable-line
  return (
    <>
      <div className="banner_position_Container">
        <Banner />
      </div>
      <div>
        <div className="row_Position_Container">
          <Row title="Trending" apiRequest={TrendingRequests} />
          <Row title="Netflix Originals" apiRequest={fetchNetflixOriginals} />
          <Row title="Top Rated Movies" apiRequest={fetchTopRated} />
          <Row title="Comedy Movies" apiRequest={fetchComedyMovie} />
          <Row title="Horror Movies" apiRequest={fetchHorrorMovie} />
          <Row title="Romance Movies" apiRequest={fetchRomanceMovie} />
          <Row title="Action Movies" apiRequest={fetchActionMovie} />
        </div>
      </div>
    </>
  );
};

export default Home;
