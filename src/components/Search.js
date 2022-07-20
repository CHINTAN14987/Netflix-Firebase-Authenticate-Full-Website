import React, { useEffect, useState } from "react";
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
};

export default Search;
