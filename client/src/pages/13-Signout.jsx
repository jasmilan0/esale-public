import { useState } from "react";
import Navbar from "../components/7-Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function SignOut(){
  const [redirect, setRedirect] = useState(false);


  async function signOutButton(){
    try {
      await axios.post('/signout');
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  if(redirect){
    return <Navigate to={'/'} />
  }
  
  
  return (
    <div className="flex">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <button onClick={signOutButton} className="-mt-48 text-white bg-green-700 contrast-125 h-10 md:h-14 w-72 md:w-96 hover:bg-green-600 rounded-sm">Sign Out</button>
      </div>


    </div>
  )
}