import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginModal.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUserLogin, setSignOut } from "../features/TokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
const LoginModal = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    returnSecureToken: true,
  });
  const [showError, setShowError] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [showEmailerror, setShowEmailError] = useState("");
  const [showPasswordError, setShowPasswordError] = useState("");
  const auth = getAuth();
  const inputDataHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
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

  const loginvalue = useSelector((state) => state.token.email);
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => {
        let user = response.user;

        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("Name", user.email);
        navigate("/home", { replace: true });
      })

      .catch((error) => {
        const errorCode = error.code;

        let editError = errorCode
          .slice(errorCode.indexOf("/"), errorCode.length)
          .substring(1);
        console.log(editError);
        if (editError === "missing-email") {
          setShowEmailError(editError);
        } else if (editError === "email-already-in-use") {
          setShowEmailError(editError);
        } else if (editError === "weak-password") {
          setShowPasswordError(editError);
        } else {
          setShowPasswordError(editError);
        }

        setShowError(errorCode);
      });
  };

  return (
    <div className="login_Container">
      <div className="login_Flex_Container">
        <h3 className="title">Sign In</h3>
        <input
          placeholder="email or phone number"
          value={loginData.email}
          name="email"
          onChange={inputDataHandler}
          required
        />
        <span className="signup_Error1">{showEmailerror}</span>
        <input
          placeholder="password"
          value={loginData.password}
          name="password"
          onChange={inputDataHandler}
          type="password"
          required
        />
        <span className="signup_Error2">{showPasswordError}</span>
        <button onClick={submitHandler}>Sign In</button>
        <div className="Form_Help">
          <div>Remember me</div>
          <div>Need help</div>
        </div>

        <h3 className="SignUp_Link_Title">
          New to Netflix?{" "}
          <span onClick={() => navigate("/signup")}>Sign up now.</span>
        </h3>
        <h3 className="Capcha_link">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </h3>
      </div>
    </div>
  );
};

export default LoginModal;
