import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogin } from "../features/TokenSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../css/Signup.css";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
  let { state } = useLocation();
  const [signUpData, setSignUpData] = useState({
    email: state,
    password: "",
    returnSecureToken: true,
  });

  const [showEmailerror, setShowEmailError] = useState("");
  const [showPasswordError, setShowPasswordError] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const SignUpToken = useSelector((state) => state.token.email);

  const submithandler = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
      .then((response) => {
        // Signed in
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
        navigate("/home");
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
      });
  };

  const inputDataHandler = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="signUpContainer">
        <div className="signUp_Flex_Container">
          <h3 className="title">Create a password to start your membership</h3>
          <p>Just a few more steps and you're done! We hate paperwork, too.</p>
          <input
            className={`input1 ${
              showEmailerror.length > 0
                ? "InputBorder__ErrorActive1"
                : "InputBorder__ErrorInActive1"
            }`}
            placeholder="email or phone number"
            value={signUpData.email}
            name="email"
            onChange={inputDataHandler}
            required
          />

          <span className="signup_Error1">{showEmailerror}</span>
          {console.log(showEmailerror)}
          {console.log(SignUpToken)}
          <input
            className={`input2 ${
              showEmailerror.length > 0
                ? "InputBorder__ErrorActive2"
                : "InputBorder__ErrorInActive2"
            }`}
            placeholder="password"
            value={signUpData.password}
            name="password"
            type="password"
            onChange={inputDataHandler}
            required
          />
          <span className="signup_Error2">{showPasswordError}</span>

          <button onClick={submithandler}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
