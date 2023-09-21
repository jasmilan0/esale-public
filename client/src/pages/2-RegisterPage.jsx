import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  async function registerUser(ev){
    ev.preventDefault();
    try {
      const res = await axios.post('/register', {
        firstName,
        lastName,
        businessName,
        email,
        password
      });
      setRedirect(true);
  
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Email already exists. Please use a different email.');
      } else {
        console.error('An error occurred:', error);
        alert("Please try next time");
      }
    }

  }

    if(redirect){
      return <Navigate to={'/login'} /> 
    }
  
  
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center gap-4">
      <header className="w-full">
        <Link to={"/"} className="flex gap-1 justify-start px-6 py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
          <span className="text-green-700 contrast-125 text-2xl">e-Sale</span>
        </Link>
      </header>

      <div className="bg-white px-6 py-6 md:px-10 md:py-10 rounded-sm flex flex-col items-center">
        <h1 className="text-xl md:text-3xl mb-6 text-center">Register For New Account</h1>
        <form onSubmit={registerUser} className="flex flex-col gap-4 items-center">
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={ev => setFirstName(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={ev => setLastName(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={ev => setBusinessName(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="email"
            placeholder="Email"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="password"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            required
          />
          <button className="bg-green-700 contrast-125 text-white py-4 w-52 md:w-64 hover:bg-green-600 rounded-sm">
            Register
          </button>
        </form>
        <h6 className="mt-2 text-center text-xs md:text-sm">
          Already Have an Account?{" "}
          <Link className="underline font-bold" to={"/login"}>
            Sign In{" "}
          </Link>
        </h6>
      </div>
    </div>
  );
}
