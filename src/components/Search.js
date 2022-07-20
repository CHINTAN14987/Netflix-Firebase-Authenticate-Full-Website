import React from "react";
import { useSelector } from "react-redux";
import "../css/Search.css";

const Search = () => {
  const searchData = useSelector((state) => state.search.value);

  const searchTitle = searchData.map((item) => {
    return item.original_title;
  });
  console.log(searchTitle);

  return (
    <>
      {searchData.length > 0 ? (
        <div className="searchContainer">
          <div className="title_wrapper">
            <h3>Explore titles related to:</h3>
            {searchData.length > 5 ? (
              <div>
                {searchTitle.slice(0, 10).map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
              </div>
            ) : (
              <>
                {searchData.length > 0 && searchData.length < 5 ? (
                  <span>
                    {
                      <>
                        {searchTitle.map((item, index) => {
                          return <span key={index}>{item}</span>;
                        })}
                      </>
                    }
                  </span>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          {searchData && (
            <div className="serach_Container">
              <div className="flex_Wrapper_Search">
                {searchData?.map((item) => {
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
          )}
        </div>
      ) : (
        <div className="searchContainer">
          <h3 className="noneResults">
            Please Enter Correct Search Term...0 Results Found
          </h3>
        </div>
      )}
    </>
  );
};

export default Search;
