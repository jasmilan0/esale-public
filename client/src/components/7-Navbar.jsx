import { Link } from "react-router-dom";
import { useState } from "react";
import "../stylesheets/2-navbar.css";

export default function Navbar() {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  return (
    <div>
      <nav className="md:hidden">
        <button onClick={toggleSideMenu}>
          {isSideMenuVisible ? (
            <div className="side-menu-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-3 mt-3 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <nav className="flex flex-col">
                <div className="mt-3">
                  {" "}
                  <div className="flex gap-1 justify-center mb-5">
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
                    <span className="text-green-700 contrast-125 text-2xl">
                      e-Sale
                    </span>
                  </div>
                </div>
                <Link
                  to={"/terminal"}
                  className="text-white text-center bg-green-700 contrast-125 hover:bg-green-600 p-4"
                >
                  Register
                </Link>
                <Link
                  to={"/reporting"}
                  className="text-white text-left hover:bg-slate-400 p-4 "
                >
                  Reporting
                </Link>
                <Link
                  to={"/orders"}
                  className="text-white text-left hover:bg-slate-400 p-4 "
                >
                  Orders
                </Link>
                <Link
                  to={"/inventory"}
                  className="text-white text-left hover:bg-slate-400 p-4"
                >
                  Inventory
                </Link>

                <Link
                  to={"/employees"}
                  className="text-white text-left hover:bg-slate-400 p-4"
                >
                  Employees
                </Link>
                <Link
                  to={"/account"}
                  className="text-white text-left hover:bg-slate-400 p-4"
                >
                  Account & Setup
                </Link>
                <button className="text-white text-left hover:bg-slate-400 p-4">
                  Sign Out
                </button>
              </nav>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>
      <nav className=" hidden md:flex flex flex-col  w-52 h-screen bg-slate-800">
        <div className="mt-3">
          {" "}
          <div className="flex gap-1 justify-center mb-5">
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
          </div>
        </div>
        <Link
          to={"/terminal"}
          className="text-white text-center bg-green-700 contrast-125 hover:bg-green-600 p-4"
        >
          Register
        </Link>
        <Link
          to={"/reporting"}
          className="text-white text-left hover:bg-slate-400 p-4 "
        >
          Reporting
        </Link>
        <Link
          to={"/orders"}
          className="text-white text-left hover:bg-slate-400 p-4 "
        >
          Orders
        </Link>
        <Link
          to={"/inventory"}
          className="text-white text-left hover:bg-slate-400 p-4"
        >
          Inventory
        </Link>

        <Link
          to={"/employees"}
          className="text-white text-left hover:bg-slate-400 p-4"
        >
          Employees
        </Link>
        <Link
          to={"/account"}
          className="text-white text-left hover:bg-slate-400 p-4"
        >
          Account & Setup
        </Link>
        <Link to={'/signout'} className="text-white text-left hover:bg-slate-400 p-4">
          Sign Out
        </Link>
      </nav>
    </div>
  );
}
