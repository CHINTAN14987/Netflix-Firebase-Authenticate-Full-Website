import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/Search.css";
import youtubeApi from "./youtubeApi";

const Search = () => {
  const searchData = useSelector((state) => state.search.value);
  const [youtubeID, setYoutubeID] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedId, setSelectedID] = useState([]);

  const searchTitle = searchData.map((item) => {
    return item.original_title;
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await youtubeApi.get("/search", {
        params: {
          q: `${
            selectedImage.original_title
          } movie-trailer ${selectedImage.release_date
            .split("-")
            .reverse()
            .join()
            .replaceAll(",", "-")}`,
        },
      });

      return response.data.items[0].id.videoId;
    };
    fetchData().then((response) => {
      setYoutubeID(response);
    });
    return () => fetchData;
  }, [selectedImage]);

  const handleVideo = (item) => {
    setYoutubeID(null);
    setSelectedImage(item);
    let arr = selectedId;
    arr.push(item.id);
    setSelectedID([...arr]);
  };

  const itemVisibility = (i) => {
    let inVisible = false;
    for (let a of selectedId) {
      if (a === i.id) {
        inVisible = true;
      }
    }

    return inVisible;
  };

  return (
    <>
      {console.log(selectedImage)}
      {console.log(youtubeID, "1")}
      {searchData.length ? (
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
                    <div>
                      {
                        <div
                          key={item.id}
                          onClick={() => {
                            handleVideo(item);
                          }}
                          onMouseLeave={() => {
                            setSelectedID([]);
                            setYoutubeID([]);
                          }}
                        >
                          {item.poster_path ? (
                            <img
                              className={`search_Wrapper ${
                                itemVisibility(item)
                                  ? "displayNone"
                                  : "DisplayBlock"
                              }`}
                              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                              alt=""
                            />
                          ) : (
                            <img
                              className={`search_Wrapper ${
                                itemVisibility(item)
                                  ? "displayNone"
                                  : "DisplayBlock"
                              }`}
                              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                              alt=""
                            />
                          )}
                          {/* {youtubeID.length > 0 && (
                            <YouTube videoId={youtubeID} opts={opts} />
                          )} */}
                          <iframe
                            title="myframe"
                            width="250"
                            className={`Youtube_Wrap ${
                              itemVisibility(item)
                                ? "displayVideo"
                                : "DisplayNone"
                            }`}
                            style={{
                              border: "2px solid #8c8c8c",
                              borderRadius: "8px",
                            }}
                            autoPlay="1"
                            src={`https://www.youtube.com/embed/${youtubeID}`}
                          ></iframe>
                        </div>
                      }
                    </div>
                  );
                })}
              </div>
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
