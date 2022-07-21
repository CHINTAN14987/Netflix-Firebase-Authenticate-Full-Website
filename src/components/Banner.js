import React, { useEffect, useState } from "react";
import { fetchNetflixOriginals } from "../requests";
import "../css/Banner.css";

const Banner = () => {
  const [BannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    const BannerMovies = async () => {
      const fetchData = await fetch(fetchNetflixOriginals);
      const response = await fetchData.json();
      return response;
    };
    BannerMovies().then((response) => {
      setBannerMovies(
        response.results[
          Math.floor(Math.random() * (response.results.length - 1))
        ]
      );
    });
  }, []);

  return (
    <>
      <div
        className="Banner_Container"
        style={{
          backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${BannerMovies.backdrop_path}"
        )`,
        }}
      >
        <div className="Banner_Content_FLex">
          <h3
            className={`Banner_Container__Heading headingChangeColor${
              /\s/.test(BannerMovies.original_title) ||
              /\s/.test(BannerMovies.name) ||
              /\s/.test(BannerMovies.title)
            } `}
          >
            {BannerMovies.name || BannerMovies.original_title || Banner.title}
          </h3>
          <p>{BannerMovies.overview}</p>
          <div className="banner_button_Wrapper ">
            <div className="banner_button_innerWrapper">
              <button className="playButton">Play</button>
              <button className="infoButton">More Info</button>
            </div>

            <span className="Banner_Container_Universal hide">
              {BannerMovies.adult ? "A" : "U/A 7+"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
