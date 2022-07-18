import React from "react";
import "../../css/StoryContainer.css";

const Comp2 = () => {
  return (
    <>
      <div className="Story_Container">
        <div className="Story_FLex_Wrap">
          <div className="card_content">
            <h3>Enjoy on your TV.</h3>
            <p>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more
            </p>
          </div>
          <div className="Story_SideTVAnimation">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="Story_Container">
        <div className="Story_FLex_Wrap">
          <div className="Story_SideTVAnimation">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
              alt=""
            />
          </div>
          <div className="card_content">
            <h3>Download your shows to watch offline.</h3>
            <p>
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>
      <div className="Story_Container">
        <div className="Story_FLex_Wrap">
          <div className="card_content">
            <h3>Watch everywhere.</h3>
            <p>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          <div className="Story_SideTVAnimation">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="Story_Container">
        <div className="Story_FLex_Wrap">
          <div className="Story_SideTVAnimation">
            <img
              src="https://occ-0-3061-2186.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABYjXrxZKtrzxQRVQNn2aIByoomnlbXmJ-uBy7du8a5Si3xqIsgerTlwJZG1vMpqer2kvcILy0UJQnjfRUQ5cEr7gQlYqXfxUg7bz.png?r=420"
              alt=""
            />
          </div>
          <div className="card_content">
            <h3>Create profiles for children.</h3>
            <p>
              Send children on adventures with their favourite characters in a
              space made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comp2;
