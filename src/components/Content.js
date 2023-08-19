import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, set } from "firebase/database";
import { Database } from "firebase/database";
import { database } from "../firebase";
import { savedRedux } from "../features/Userslice";
import { toast } from "react-hot-toast";
function Content() {
  const data = useSelector((state) => state.user.newsList);
  const user=useSelector((state)=>state.user.userList)
  const dispatch=useDispatch();
  console.log(data);
  const navigate=useNavigate();
  const [change,setchange]=useState(false)
function handleSingle(value)
{
  console.log(value);
   navigate("/detail/"+value)
}

function handlesave(value)
{
    console.log(value);
    
    const postListRef = ref(database, 'posts');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        email:user.username,
        article:value
    });
    toast("Added to Favorite Articles")
   
}
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between items-start ">
        <h1 className="w-full bg-[#FC4308] p-6 text-xl md:text-2xl font-medium">
          Top Headlines
        </h1>
        <div className=" flex md:hidden justify-normal items-center m-6 md:m-12 text-lg  ">
          <p className="text-[#FC4308]" onCanPlay={()=>navigate("/")}>HOME</p>
        </div>
        <div className="w-full flex justify-end items-center">
          <div className="p-4 md:flex justify-between items-center gap-6 hidden">
            <div className="bg-gray-200 rounded-lg p-3 cursor-pointer hover:scale-110 duration-200" onClick={(event)=>setchange(false)}>
              {" "}
              <FaThList color={change ? "black" : "#FC4308"}></FaThList>
            </div>
            <div className="bg-gray-200 rounded-lg p-3 cursor-pointer hover:scale-110 duration-200" onClick={(event)=>setchange(true)}>
              {" "}
              <BsGridFill color={change ? "#FC4308" :"black" }></BsGridFill>
            </div>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-center flex-wrap gap-2 md:gap-12 mx-2 my-12">
          {data[0].map((post, index) => {
            return (
              <NewsCard
                key={index}
                change={change}
                author={post.author}
                title={post.title}
                content={post.content}
                description={post.description}
                publishedAt={post.publishedAt}
                url={post.url}
                urlToImage={post.urlToImage}
                single={handleSingle}
                saved={handlesave}
              ></NewsCard>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Content;
