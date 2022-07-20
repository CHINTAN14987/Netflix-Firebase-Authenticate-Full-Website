import About from "./About";
import "./App.css";
import MyNav from "./MyNav";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Detail from "./components/Detail";
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/Signup";
import LoginModal from "./components/LoginModal";
import Search from "./components/Search";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const state = useSelector((state) => state.token.email);

  return (
    <div className="App">
      <BrowserRouter>
        <MyNav />
        {console.log(state)}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            element={<PrivateRoute auth={localStorage.getItem("token")} />}
          >
            <Route path="/home" element={<Home />} />
            <Route
              path={
                `/details/:original_title` ||
                `/details/:title` ||
                `/details/:original_name`
              }
              element={<Detail />}
            />
          </Route>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
