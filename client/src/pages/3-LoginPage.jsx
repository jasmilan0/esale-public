import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function submitLogin(ev) {
    ev.preventDefault();
    try {
      await axios.post("/login", {
        email, password
      });
      setRedirect(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid Password");
      } else if (error.response && error.response.status === 404) {
        alert("Email not found");
      } else {
        console.error("An error occurred:", error);
        alert("Please try next time");
      }
    }
  }
  


  if (redirect) {
    return <Navigate to={"/terminal"} />;
  } 

  return (
    (
      <div className="flex">
      <div className="bg-white w-full md:w-auto">
        <header className="w-full">
          <Link
            to={"/"}
            className="flex gap-1 justify-center md:justify-start px-6 py-6"
          >
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

        <div className="mt-16 p-10 flex flex-col items-center">
          <h2 className="text-3xl mb-5 font-medium">Log In</h2>
          <form onSubmit={submitLogin} className="flex flex-col gap-4">
            <input
              className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="text-center text-white bg-green-700 contrast-125 h-10 md:h-14 w-72 md:w-96 hover:bg-green-600 rounded-sm">
              {" "}
              Log In
            </button>
          </form>
          <h6 className="mt-2 text-center text-xs md:text-sm">
            Don't Have an Account?{" "}
            <Link className="underline font-bold" to={"/register"}>
              Register{" "}
            </Link>
          </h6>
        </div>
      </div>
      <div className="hidden md:block">
        <img className="h-screen" src="/pic8.avif" alt="" />
      </div>
    </div>
    )
  );
}
