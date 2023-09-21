import { useEffect, useState } from "react";
import Navbar from "../components/7-Navbar";
import axios from "axios";

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  
  useEffect(() => {
    const userInfo = async () => {
      const response = await axios.get('/getUserInfo');
      setEmail(response.data.email);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setBusinessName(response.data.businessName);
    }

    userInfo();

  }, [])

  async function updateUser() {
    //ev.preventDefault();
    try {
      await axios.put('/updateUser', {
        email, firstName, lastName, businessName
      })
    } catch (error) {
      console.log(error);
    }

  }
  
  
  
  return (
    <div className="flex">
      <Navbar />

      <div className="p-4 w-full">
        <h2 className="text-3xl mb-7">Account Setup</h2>

        <div>
          <form onSubmit={updateUser} className="flex flex-col gap-2 mt-8">
            <input
              className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
              type="text"
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
            <input
              className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
              type="text"
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
            <input
              className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
              type="text"
              value={businessName}
              onChange={(ev) => setBusinessName(ev.target.value)}
            />
            
            <button className="text-center text-white bg-green-700 contrast-125 h-10 md:h-14 w-72 md:w-96 hover:bg-green-600 rounded-sm">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
