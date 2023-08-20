import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { loginRedux, newsRedux } from "./features/Userslice";
import Header from "./components/Header";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

import Single from "./pages/Single";
import Saved from "./pages/Saved";
import Category from "./pages/Category";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "http://newsapi.org/v2/top-headlines?country=in&apiKey=08eac04e24f640daa5aa170f01f01cff"
      )
      .then((response) => {
        if (response.data) {
          const filter = response.data.articles.filter(
            (d) =>
              d.author !== null &&
              d.description !== null &&
              d.urlToImage !== null &&
              d.content !== null
          );
          dispatch(newsRedux(filter));
       
        } else {
          toast("Something went wrong Refresh again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginRedux(user));
      }
    });
  }, []);

  return (
    <div className="App flex justify-between items-center gap-6 md:gap-12 flex-col w-full">
      <Toaster></Toaster>
      
      <Router>
      <Header></Header>
        <Routes>
          <Route exact path="/register" element={<Register></Register>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route
            exact
            path="/detail/:title"
            element={<Single></Single>}
          ></Route>
          <Route exact path="/saved" element={<Saved></Saved>}></Route>
          <Route exact path="/category/:name" element={<Category></Category>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
