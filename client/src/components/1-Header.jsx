import { Link } from "react-router-dom";
import "../stylesheets/1-header.css";
import { useState } from "react";

export default function HeaderComp() {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  return (
    <div className="px-6 py-4">
      <header className="flex justify-between">
        <Link to={"/"} className="flex gap-1 items-center">
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
        <div className="hidden md:flex gap-2 items-center">
          <Link to={"/login"} className="font-Rajdhani classy-button-animation">
            Log In
          </Link>
          <Link
            to={"/register"}
            className="font-Rajdhani text-white bg-green-700 contrast-125 px-4 py-3 rounded-md"
          >
            Register
          </Link>
        </div>

        <button className="md:hidden" onClick={toggleSideMenu}>
          {isSideMenuVisible ? (
            <div className="side-menu-content flex flex-col gap-4 px-6 py-4">
              <div className="flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <Link
                  to={"/login"}
                  className="font-Rajdhani w-1/2 text-white bg-green-700 contrast-125 px-4 py-3 rounded-md"
                >
                  Log In
                </Link>
                <Link
                  to={"/register"}
                  className="font-Rajdhani w-1/2 text-white bg-green-700 contrast-125 px-4 py-3 rounded-md"
                >
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
        </button>
      </header>
    </div>
  );
}
