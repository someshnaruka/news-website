import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { BsFillHeartFill } from "react-icons/bs";
import { AiTwotoneCalendar } from "react-icons/ai";
import { RotatingLines } from 'react-loader-spinner';
import { getDatabase, ref, push, set } from "firebase/database";
import { database } from "../firebase";
import { toast } from 'react-hot-toast';
import { IoIosArrowForward } from 'react-icons/io';
function Single(props) {
    const {title}=useParams();
console.log(title);
const [isLoading, setLoading] = useState(true);

const str=title.replace(/[^\w ]/g, '');
console.log(str);
const navigate=useNavigate();
const data=useSelector((state)=>state.user.newsList);
console.log(data,"news data"); 


 const user=useSelector((state)=>state.user.userList)   
const filter=data[0].filter((d)=>d.author===str );

function handlesave()
{
    console.log(filter[0],"Value to save");
    
    const postListRef = ref(database, 'posts');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        email:user.username,
        article:filter[0]
    });
    toast("Added to Favorite Articles")
   
}
    

    console.log(filter,"single data");
  return (
   <>

   {
      filter[0] && data[0] ?<div className='flex flex-col justify-between items-center mx-3'>
      <div className="w-full flex md:hidden justify-normal items-center  text-lg gap-2  ">
          <p className="text-[#FC4308]" onClick={()=>navigate("/")}>HOME </p>
          <IoIosArrowForward color='#FC4308'></IoIosArrowForward>
          <p className="text-[#FC4308]" onClick={()=>navigate("/")}>Detail</p>
        </div>
       <div className='m-6 md:m-20  md:h-96  bg-gray-200  border-1 rounded-lg flex md:flex-row flex-col justify-between items-start p-3'>
     
    <div className='md:w-1/2 w-full h-full flex items-center justify-center rounded-lg overflow-hidden border-1'>
        <img src={filter[0].urlToImage} className='h-full w-full bg-cover'></img>
    </div>
    <div className='md:w-1/2 w-full h-1/2 md:h-full flex flex-col justify-between items-start p-3 drop-shadow-lg'>
    <h1 className='text-lg md:text-2xl font-bold w-full text-black text-left'>{filter[0].title}</h1>
    <p className='text-base md:text-lg w-full text-left'>{filter[0].content}</p>
    <div className="flex  items-center gap-1 font-bold hover:text-[#FC4308] hover:scale-110 origin-left cursor-pointer">
            {" "}
            <a href={filter[0].url} target='_blank' className='font-bold text-lg '>Read Full Article</a>
            <AiOutlineArrowRight></AiOutlineArrowRight>
          </div>
          <div className="flex w-full  justify-between items-start">
            <div className="flex flex-col justify-start items-center w-3/4 gap-2">
              <p className="text-sm md:text-lg text-black font-medium w-full text-left">
              - {filter[0].author}
              </p>
              <p className="text-sm md:text-lg text-black font-medium w-full text-left flex justify-normal gap-3 items-center">
              <AiTwotoneCalendar size={20}></AiTwotoneCalendar>
                {filter[0].publishedAt}
              </p>
            </div>
            <div className="w-1/4 flex items-end justify-end p-3">
              <BsFillHeartFill
                size={25}
                className="text-black h-full hover:fill-red-600 overflow-hidden cursor-pointer" onClick={handlesave}
              ></BsFillHeartFill>
            </div>
          </div>
    </div>

    </div></div> : <div className="w-full h-screen flex justify-center items-center"> <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        /></div>
   }
   
    

   </>
  )
}

export default Single