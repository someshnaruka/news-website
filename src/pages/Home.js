import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux, newsRedux } from "../features/Userslice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Header from "../components/Header";
import Content from "../components/Content";
function Home() {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
const data=useSelector((state)=>state.user.newsList);
console.log(data);
  return (
    <>
    {
        data[0]==null ? <div className="w-full h-screen flex justify-center items-center"> <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        /></div>: <div className="flex flex-col justify-between items-center gap-10">
        <Content></Content>
      </div>
    }
     

      <div></div>
    </>
  );
}

export default Home;
