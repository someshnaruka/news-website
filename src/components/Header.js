import React, { useEffect, useState } from "react";
import logo from "../assets/MEGA.news.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

import { RxCross2 } from "react-icons/rx";
import "animate.css";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { logoutRedux } from "../features/Userslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function Header() {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const navigate=useNavigate();
  const current = new Date();
  const data = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  console.log(data);

  function handlelogout() {
    setMenu(false);
    auth
      .signOut()
      .then(() => {
        dispatch(logoutRedux());
        toast("Loged out Successfully")
        setTimeout(() => {
            navigate("/") 
        }, 1000);
      
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
function handleClick(event)
{
    setCategory(event.target.value)
    console.log(category);
}
function handleChange(event){
    setCategory(event.target.value)
    console.log(category);
   
}

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  return (
    <>
      <div className="flex justify-between md:items-end items-center w-full  border-[1px] border-white  shadow-lg rounded-lg  p-3 bg-white ">
        <RxHamburgerMenu
          size={20}
          className="md:hidden flex cursor-pointer"
          onClick={() => setMenu(!menu)}
        ></RxHamburgerMenu>
        {/* 
         mobile menu */}

        {menu && (
          <div className="md:hidden w-1/2 absolute z-30 border-1 h-screen flex flex-col justify-normal items-start gap-6 p-4 top-3  left-0 bg-white drop-shadow-lg border-1">
            <div
              className="flex items-end justify-end w-full "
              onClick={(event) => setMenu(!menu)}
            >
              {" "}
              <RxCross2 size={20}></RxCross2>
            </div>

            <div className="flex justify-between items-center gap-3 ">
              <TfiWorld size={20} color="#FC4308"></TfiWorld>
              <p className="text-black tetx-xl ">{date}</p>
            </div>

            <div className="flex flex-col gap-1 w-full ">
              <div className="flex justify-between items-center  ">
                <p>Categories</p>
                <IoIosArrowDown
                  size={20}
                  onClick={() => setShow(!show)}
                  className=""
                ></IoIosArrowDown>
              </div>
              {show && (
                <div className="flex flex-col justify-between  items-start gap-3 ml-2 text-black">
                  <p
                    className="w-full cursor-pointer "
                    onClick={handleClick}
                  >
                    Business
                  </p>
                  <p
                    className="w-full cursor-pointer "
                    onClick={handleClick}
                  >
                    Entertainment
                  </p>
                  <p
                    className="w-full cursor-pointer "
                    onClick={handleClick}
                  >
                    General
                  </p>
                  <p
                    className="w-full cursor-pointer "
                    onClick={handleClick}
                  >
                    Health
                  </p>
                  <p
                    className="w-full cursor-pointer "
                    onClick={handleClick}
                  >
                    Science
                  </p>
                  <p
                    className="w-full cursor-pointer "
                    onClick={handleClick}
                  >
                    Sports
                  </p>
                  <p
                    className="w-full cursor-pointer "
                    onClick={handleClick}
                  >
                    Technology
                  </p>
                </div>
              )}
            </div>

            <p className="text-lg">Contact Us</p>
            <p className="text-lg">About Us</p>
            <p className="text-lg" onClick={handlelogout}>
              Logout
            </p>
          </div>
        )}

        {/* desktop menu */}

        <div className="hidden md:flex justify-between gap-6 items-center text-black text-lg">
          <div className="flex justify-between items-center gap-3 ">
            <TfiWorld size={20} color="#FC4308"></TfiWorld>
            <p className="text-black tetx-xl ">{date}</p>
          </div>

          <select className="ml-6 border-transparent border-none outline-none" onChange={handleChange} value={category}>
            <option className="hidden" >Categories</option>
            <option>Business</option>
            <option>Entertainment</option>
            <option>General</option>
            <option>Health</option>
            <option>Science</option>
            <option>Sports</option>
            <option>Technology</option>
          </select>
          <p className="text-lg">Contact Us</p>
          <p className="text-lg">About Us</p>
        </div>
        <a href="/" className="cursor-pointer">
          <img
            src={logo}
            className="flex items-center justify-center md:w-40"
          ></img>
        </a>
        {data.name === "" ? (
          <p
         
            className="text-xl text-black cursor-pointer font-bold text-right w-1/4"
           onClick={()=>navigate("/login")}>
            Login
          </p>
        ) : (
          <div className="flex relative justify-normal items-end md:gap-3 gap-1 flex-col md:flex-row ">
            <p className="md:text-2xl text-base text-left text-[#FC4308]">
              Welcome
            </p>
            <p className="md:text-2xl text-base">{data.name}</p>
            <IoIosArrowDown
              size={20}
              onClick={() => setMenu(!menu)}
              className="hidden md:flex mb-1 cursor-pointer"
            ></IoIosArrowDown>
            {menu && (
              <div className="hidden md:flex flex-col absolute z-50 bg-white  bottom-0  border-transparent right-1 w-2/5 h-10  top-[43px] pb-8">
                <a href="/"
                  className="text-xl w-full p-2  text-black cursor-pointer"
                  onClick={handlelogout}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        )}
        <a href="/saved">
          <div className="p-1 rounded-lg bg-gray-300">
            <BsFillBookmarkHeartFill 
              size={25}
              color="black"
              className="cursor-pointer"
            ></BsFillBookmarkHeartFill>
          </div>
        </a>
      </div>
    </>
  );
}

export default Header;
