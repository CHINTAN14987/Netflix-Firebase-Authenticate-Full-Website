import React, { useEffect } from "react";
import "./css/Home.css";
import Row from "./components/Row";
import {
  TrendingRequests,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchComedyMovie,
  fetchHorrorMovie,
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
  }, []);
  return (
    <>
      <div style={{ height: "80vh", position: "relative" }}>
        <Banner />
      </div>
      <div style={{ top: "-120px", position: "relative", padding: "20px" }}>
        <Row title="Trending" apiRequest={TrendingRequests} />
        <Row title="Netflix Originals" apiRequest={fetchNetflixOriginals} />
        <Row title="Top Rated Movies" apiRequest={fetchTopRated} />
        <Row title="Comedy Movies" apiRequest={fetchComedyMovie} />
        <Row title="Horror Movies" apiRequest={fetchHorrorMovie} />
      </div>
    </>
  );
};

export default Home;
