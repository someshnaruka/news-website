import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '../components/NewsCard';
import {  ref, child, get, onValue } from "firebase/database";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { database } from '../firebase';
import { IoIosArrowForward } from "react-icons/io";

import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
function Saved() {
const dispatch=useDispatch();
const navigate=useNavigate();
const [article,setarticle]=useState([])
const [isLoading,setLoading]=useState(true)
    useEffect(()=>{
        const postListRef = ref(database, 'posts');
        onValue(postListRef,(snapshot)=>{
            const data=snapshot.val();
            console.log(data);
            if(data!==null)
            {
                setLoading(false)
                Object.values(data).map((post,index)=>{
                   setarticle((prev)=>[...prev,post])
                   
                });
            }
        })
    },[])
const user=useSelector((state)=>state.user.userList)
const [change,setchange]=useState(false)


const unique=article.filter((d)=>d.email===user.username)
    console.log(unique,"unique");
    console.log(article,"saved data");
   
 
  return (
    <>

    {
       user.name ?<div className='w-full h-full flex flex-col justify-between items-start'>

<h1 className="w-full bg-[#FC4308] p-6 text-xl md:text-2xl font-medium">
  Top Headlines
</h1>
 <div className="w-full flex md:hidden justify-normal items-center m-6 md:m-12 text-lg gap-2  ">
          <p className="text-[#FC4308]" onClick={()=>navigate("/")}>HOME </p>
          <IoIosArrowForward color='#FC4308'></IoIosArrowForward>
          <p className="text-[#FC4308]" onClick={()=>navigate("/")}>SAVED</p>
        </div>
 <div className="p-4 md:flex justify-end items-center gap-6 hidden w-full">
            <div className="bg-gray-200 rounded-lg p-3 cursor-pointer hover:scale-110 duration-200" onClick={(event)=>setchange(false)}>
              {" "}
              <FaThList color={change ? "black" : "#FC4308"}></FaThList>
            </div>
            <div className="bg-gray-200 rounded-lg p-3 cursor-pointer hover:scale-110 duration-200" onClick={(event)=>setchange(true)}>
              {" "}
              <BsGridFill color={change ? "#FC4308" :"black" }></BsGridFill>
            </div>
          </div>
{
    isLoading ? <div className="w-full h-screen flex justify-center items-center"> <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>:<div className=" flex flex-col md:flex-row items-center justify-center flex-wrap gap-2 md:gap-12 mx-2 my-12">
  {unique?.map((post, index) => {
    return (
      <NewsCard
        key={index}
        change={change}
        author={post.article.author}
        title={post.article.title}
        content={post.article.content}
        description={post.article.description}
        publishedAt={post.article.publishedAt}
        url={post.article.url}
        urlToImage={post.article.urlToImage}

      ></NewsCard>
    );
  })}
</div> 
}

</div> :<p className='text-4xl font-bold w-full bg-[#FC4308] text-center p-6'>login to Access Saved articles</p>
    }
        
    </>
  )
}

export default Saved