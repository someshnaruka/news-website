import React, { useState } from "react";
import logo from "../assets/MEGA.news.svg";
import user from "../assets/user.png";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../firebase"
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate=useNavigate();
  const [details, setdetails] = useState({
    name: "",
    username: "",
    password: "",
    conPassword: "",
  });
  const [disable, setDisable] = useState(false);



  function handleChange(event) {
    const { name, value } = event.target;

    setdetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    console.log(details);
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    if (details.password === details.conPassword) {
   
      setDisable(true);
      createUserWithEmailAndPassword(
        auth,
        details.username,
        details.password
      ).then((response) => {
        const user=response.user;
        updateProfile(user,{
          displayName:details.name,
        })
       
      setDisable(false);
      toast("User Registered Successfully")
      setTimeout(() => {
        navigate("/login")
      }, 1000);

        console.log(response);
      }).catch((err)=>{
    
      setDisable(false);
      toast(err.message);;
      });
    } else {
      toast("Password does not match");
    }
  }

  return (
    <>
      <div className="flex  justify-center items-center  w-full md:w-1/2">
        <div className="w-full  flex flex-col gap-4 justify-between items-start border-2 border-gray-200 rounded-xl  drop-shadow-lg mx-3 bg-white p-6 ">
          <div className="w-full flex justify-center items-center">
            <img src={logo}></img>
          </div>
          <div className="w-full">
            {" "}
            <h1 className="text-xl md:text-3xl text-black font-robo font-bold">
              Create an Account
            </h1>
            <hr className="bg-gray-300 w-full border-1 h-[1px]"></hr>
          </div>

          <form className="w-full flex flex-col justify-between items-start gap-3 p-2 m-3">
            <div className="w-full  flex flex-col justify-between gap-2 items-start ">
              <label
                htmlFor="name"
                className="text-base md:text-xl text-black font-robo "
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={details.name}
                required
                className="bg-gray-100 p-3 w-full rounded-lg border-[1px] border-gray-300"
              ></input>
            </div>

            <div className="w-full  flex flex-col justify-between gap-2 items-start ">
              <label
                htmlFor="username"
                className="text-base md:text-xl text-black font-robo "
              >
                Email
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={details.username}
                required
                className="bg-gray-100 p-3 w-full rounded-lg border-[1px] border-gray-300"
              ></input>
            </div>
            <div className="w-full  flex flex-col justify-between gap-2 items-start ">
              <label
                htmlFor="password"
                className="text-base md:text-xl text-black font-robo "
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                onChange={handleChange}
                value={details.password}
                required
                className="bg-gray-100 p-3 w-full rounded-lg border-[1px] border-gray-300"
              ></input>
            </div>
            <div className="w-full flex flex-col justify-between gap-2 items-start ">
              <label
                htmlFor="conPassword"
                className="text-base md:text-xl text-black font-robo "
              >
                Confirm Password
              </label>
              <input
                type="text"
                name="conPassword"
                onChange={handleChange}
                value={details.conPassword}
                required
                className="bg-gray-100 p-3 w-full rounded-lg border-[1px] border-gray-300"
              ></input>
            </div>

            {disable ? (
              <button
                className="border-1 border-transparent rounded-lg bg-blue-600  text-white px-3 py-2 w-full my-2"
                disabled
              >
                {" "}
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Register
              </button>
            ) : (
              <button
                className="border-1 border-transparent rounded-lg bg-blue-600 text-white px-3 py-2 w-full my-2"
                onClick={handleSubmit}
              >
                Register
              </button>
            )}

            <p className="text-sm md:text-base text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 cursor-pointer">
                {" "}
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
