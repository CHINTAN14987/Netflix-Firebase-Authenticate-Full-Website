import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/MyNav.css";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { BsSearch } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";
import { setSignOut } from "../features/TokenSlice";
import useDebounce from "./hooks/useDebounce";
import { searchActions } from "../features/searchSlice";
const MyNav = () => {
  const API_KEY = "919bd094f6efdd25c2917fdc4aeae4d9";
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [show, handleShow] = useState(false);
  let navigate = useNavigate();
  const [inputOpacity, setInputOpacity] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputCrossIcon, setInputCrossIcon] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const debounceSearch = useDebounce(inputValue, 500);
  const ref = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debounceSearch}`
      );
      const data = fetchResponse.json();
      return data;
    };

    if (debounceSearch) {
      fetchData().then((response) => {
        dispatch(searchActions.searchFilter(response.results));
        navigate("/search");
      });
    }
  }, [debounceSearch]); // eslint-disable-line

  useEffect(() => {
    document.addEventListener("mousedown", handleInputTarget);
    return () => {
      document.removeEventListener("mousedown", handleInputTarget);
    }; // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const handleInputTarget = (e) => {
    // console.log(e.target);
    if (inputValue.length > 0) {
      if (!ref?.current?.contains(e.target)) {
        console.log(!ref?.current?.contains(e.target));
        setInputOpacity(false);
      }
      setInputCrossIcon(false);
    }
  };

  const opacityHandle = () => {
    setInputOpacity(!inputOpacity);
    setInputCrossIcon(true);
  };

  const SearchHandler = (e) => {
    setInputValue(e.target.value);
  };
  const dropDownHandler = () => {
    setDropDown(!dropDown);
  };

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
  const cancelInput = () => {
    setInputValue("");
    setInputOpacity(false);
  };
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
              pathname === "/signup"
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
                  ref={ref}
                  value={inputValue}
                  onChange={SearchHandler}
                />
              )}
              {inputValue.length > 0 && inputCrossIcon && (
                <ImCross
                  className="icon"
                  color="white"
                  size="10px"
                  onClick={cancelInput}
                />
              )}
            </div>
            <div className="Name_Logo" onClick={logout}>
              {localStorage.getItem("Name").length &&
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
