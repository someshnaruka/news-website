import React, { useEffect, useState } from 'react'
import { BsGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { useParams } from 'react-router-dom'
import NewsCard from '../components/NewsCard';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { newsRedux } from '../features/Userslice';

function Category() {

    const [change,setchange]=useState(false)
const [article,setarticle]=useState([])
   const dispatch=useDispatch();
    const {name}=useParams();
    useEffect(() => {
        axios
          .get(
            "https://newsapi.org/v2/top-headlines?country=in&category="+name+"&apiKey=08eac04e24f640daa5aa170f01f01cff"
          )
          .then((response) => {
            if (response.data) {
                console.log(response.data);
              const filter = response.data.articles.filter(
                (d) =>
                  d.author !== null &&
                  d.description !== null &&
                  d.urlToImage !== null &&
                  d.content !== null
              );
           dispatch(newsRedux(filter))
            } else {
              toast("Something went wrong Refresh again");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

const data=useSelector((state)=>state.user.newsList)

  return (
    <>
 <div className='w-full h-full flex flex-col justify-between items-start'>

<h1 className="w-full bg-[#FC4308] p-6 text-xl md:text-2xl font-medium">
  Top Headlines
</h1>
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
    data ? <div className=" flex flex-col md:flex-row items-center justify-center flex-wrap gap-2 md:gap-12 mx-2 my-12">
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

      ></NewsCard>
    );
  })}
</div> :<div className="w-full h-screen flex justify-center items-center"> <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>
}

</div> 
    
    </>
  )
}

export default Category