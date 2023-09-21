import { useState } from "react";
import Navbar from "../components/7-Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function AddEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function addEmployee(ev) {
    ev.preventDefault();
    try {
      axios.post("/addEmployee", {
        firstName,
        lastName,
        password,
        email
      });
      setRedirect(true);

    } catch (error) {
      console.error("error", error);
    }
  }

  if(redirect){
    return <Navigate to={'/employees'} />
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 w-full">
        <h3 className="text-3xl mb-8">New Employee</h3>
        <form onSubmit={addEmployee} className="flex flex-col gap-2 mt-8">
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
          />
          <input
            type="email"
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            placeholder="email"
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
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}
