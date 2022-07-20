import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Row.css";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";
import { FiPauseCircle } from "react-icons/fi";

const Row = ({ title, apiRequest }) => {
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const api = async () => {
      const fetchData = await fetch(apiRequest);
      const response = fetchData.json();
      return response;
    };
    api().then((result) => {
      setMovies(result);
    });
  }, []);
  const handleClick = (item) => {
    console.log(item);
    navigate(
      `/details/:${
        item.original_title?.replace(/\s/g, "") ||
        item.original.name?.replace(/\s/g, "") ||
        item.name?.replace(/\s/g, "")
      }`,
      { state: item }
    );
  };

  return (
    <div>
      <h3 className="Row__Title">{title}</h3>
      <div className="row">
        {movies?.results?.map((item) => {
          const { id, poster_path } = item;
          return (
            <div className="Row__Img" key={id}>
              <img
                onClick={() => {
                  handleClick(item);
                }}
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
