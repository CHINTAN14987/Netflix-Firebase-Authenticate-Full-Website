import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SignIn.css";
import StoryContainer from "./StoryContainer";

const SignIn = () => {
  const [inputvalue, setInputValue] = useState("");
  let navigate = useNavigate();
  return (
    <>
      <div className="signIn_Container">
        <div className="signIn_Background_Image">
          <div className="flex_Container_SignIn">
            <p className="title">Unlimited movies, TV shows and more.</p>
            <h3 className="subtitle">Watch anywhere. Cancel anytime.</h3>
            <p className="card_title-detail">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="input_Wrapper">
              <input
                value={inputvalue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                type="email"
                required
                placeholder="Enter your Email"
                size="30"
              />
              <button
                onClick={() => {
                  if (inputvalue !== "") {
                    navigate("/signup", { state: inputvalue });
                  }
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <StoryContainer />
    </>
  );
};

export default SignIn;
