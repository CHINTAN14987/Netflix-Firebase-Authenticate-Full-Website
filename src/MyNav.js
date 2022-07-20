import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/MyNav.css";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { BsSearch } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";
import { setSignOut } from "./features/TokenSlice";
import {
  TrendingRequests,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovie,
  fetchComedyMovie,
  fetchHorrorMovie,
  fetchRomanceMovie,
} from "./requests";

const MyNav = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [show, handleShow] = useState(false);
  let navigate = useNavigate();
  const [inputOpacity, setInputOpacity] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [dropDown, setDropDown] = useState(false);

  const SignUpSuccessful = useSelector((state) => state.token.email);
  const opacityHandle = () => {
    setInputOpacity(!inputOpacity);
  };

  const SearchHandler = (e) => {
    setInputValue(e.target.name);
  };
  const dropDownHandler = () => {
    setDropDown(!dropDown);
  };
  // console.log(localStorage.getItem("token").length);
  // useEffect(() => {
  //   auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       dispatch(
  //         setUserLogin({
  //           name: user.displayName,
  //           email: user.email,
  //           photo: user.photoURL,
  //         })
  //       );
  //       navigate("/home");
  //     }
  //   });
  // }, []);
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
      setMovies([
        ...r[0].results,
        ...r[1].results,
        ...r[2].results,
        ...r[3].results,
        ...r[4].results,
        ...r[5].results,
        ...r[6].results,
      ]);
    });
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const scrollFunction = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  const handleAuth = () => {
    navigate("/login");
  };
  const logout = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      navigate("/login");
      localStorage.clear();
    });
  };
  const deBounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 3000);
    };
  };
  {
    console.log(movies);
  }
  return (
    <div
      className={`NavContainer ${
        pathname === "/signup" ? "signUpNavbar" : ""
      } ${pathname === "./home" && "homeNavbar"} ${
        (show === true) &
          (pathname === "/home" || pathname.includes("details")) &&
        "fixedHomepageBar"
      }`}
    >
      <div className="leftHeader">
        <img
          className="Logo"
          src="https://pngimg.com/uploads/netflix/netflix_PNG15.png"
          alt=""
        />
        {localStorage.getItem("token") ? (
          <div className="header_Link_Wrapper">
            <div className={`header_link ${dropDown ? "dropDown_FLex" : ""}`}>
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/home">Series</NavLink>
              <NavLink to="/home">Films</NavLink>
              <NavLink to="/home">New & Popular</NavLink>
              <NavLink to="/home">My List</NavLink>
            </div>
            <div className="header_dropDown_wrapper" onClick={dropDownHandler}>
              <span className="Header_dropdown">Browse</span>
              <GoTriangleDown
                className="dropdownicon"
                size="15px"
                color="white"
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="inputWrapper">
        {localStorage.getItem("token") ? (
          <></>
        ) : (
          <h3
            className={`${
              pathname === "/login"
                ? "activebuttonHeading"
                : "inactivebuttonHeading"
            }`}
            onClick={handleAuth}
          >
            Sign In
          </h3>
        )}
        {localStorage.getItem("token") ? (
          <>
            <div
              className={`header_inputFlex ${
                inputOpacity && "inputborderOpacity"
              }`}
            >
              <BsSearch
                className="icon"
                color="white"
                size="20px"
                onClick={opacityHandle}
              />
              {inputOpacity && (
                <input
                  placeholder="Titles, People, Genres..."
                  value={inputValue}
                  onChange={SearchHandler}
                />
              )}
              {inputValue.length > 0 && (
                <ImCross className="icon" color="white" size="10px" />
              )}
            </div>
            <div className="Name_Logo" onClick={logout}>
              {localStorage.getItem("Name").length > 0 &&
                localStorage.getItem("Name").charAt(0).toUpperCase()}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyNav;
