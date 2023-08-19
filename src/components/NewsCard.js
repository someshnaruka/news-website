import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

function NewsCard(props) {

function handlesave()
{
    const detail={
        author:props.author,
        title:props.title,
        description:props.description,
        content:props.content,
        url:props.url,
        urlToImage:props.urlToImage,
        publishedAt:props.publishedAt,

    }

    props.saved(detail)
}
    function handleClick()
    {
        props.single(props.author)
    }
  return (
    <>
    {
        props.change ? <div className="w-1/4 h-[550px]  border-1 rounded-lg bg-white drop-shadow-lg flex flex-col justify-between items-start md:items-center p-2">
        <div className="w-full h-1/2  overflow-hidden rounded-lg md:m-2 m-2 flex items-start justify-center">
          <img src={props.urlToImage} className="w-full h-full hover:scale-105  bg-cover rounded-lg"></img>
        </div>

        <div className="w-full  md:h-1/2 flex flex-col text-xs md:text-sm justify-between items-start  m-2 ">
          <p className="font-bold">{props.title}</p>
          <p></p>
          <p className="text-sm font-normal ">{props.description.substring(0,120)}...</p>
          <div className="flex w-full items-center gap-1 font-bold hover:text-[#FC4308] hover:scale-110 origin-left cursor-pointer">
            {" "}
            <p>Read more </p>
            <AiOutlineArrowRight></AiOutlineArrowRight>
          </div>

          <div className="flex w-full rounded-md px-3 py-2 bg-gray-200 justify-between items-start">
            <div className="flex flex-col justify-start items-center w-3/4 gap-2">
              <p className="text-sm text-black font-medium w-full text-left">
                {props.author}
              </p>
              <p className="text-sm text-black font-medium w-full text-left">
                {props.publishedAt}
              </p>
            </div>
            <div className="w-1/4 flex items-end justify-end p-3" onClick={handlesave}>
              <BsFillHeartFill
                size={25}
                className="text-black h-full hover:fill-red-600 overflow-hidden cursor-pointer" 
              ></BsFillHeartFill>
            </div>
          </div>
        </div>
      </div> : <div className="w-full md:w-2/5 md:h-72  border-1 rounded-lg bg-white drop-shadow-lg flex md:flex-row flex-col justify-between items-start p-2 md:p-1">
        <div className="md:w-1/2  overflow-hidden rounded-lg md:m-2 m-4 flex items-start justify-center h-full">
          <img src={props.urlToImage} className="w-full md:h-[90%] hover:scale-105 duration-200  bg-cover rounded-lg"></img>
        </div>

        <div className="md:w-1/2  md:h-[90%] flex flex-col text-xs md:text-sm justify-between items-start gap-2 md:m-2 m-4">
          <p className="font-bold">{props.title}</p>
          <p></p>
          <p className="text-sm font-normal ">{props.description.substring(0,120)}...</p>
          <div className="flex w-full items-center gap-1 font-bold hover:text-[#FC4308] hover:scale-110 origin-left cursor-pointer" onClick={handleClick}>
            {" "}
            <p>Read more </p>
            <AiOutlineArrowRight></AiOutlineArrowRight>
          </div>

          <div className="flex w-full rounded-md px-3 py-2 bg-gray-200 justify-between items-start">
            <div className="flex flex-col justify-start items-center w-3/4 gap-2">
              <p className="text-sm text-black font-medium w-full text-left">
                {props.author}
              </p>
              <p className="text-sm text-black font-medium w-full text-left">
                {props.publishedAt}
              </p>
            </div>
            <div className="w-1/4 flex items-end justify-end p-3" onClick={handlesave}>
              <BsFillHeartFill
                size={25}
                className="text-black h-full hover:fill-red-600 overflow-hidden cursor-pointer"
              ></BsFillHeartFill>
            </div>
          </div>
        </div>
      </div>
    }
     
    </>
  );
}

export default NewsCard;
