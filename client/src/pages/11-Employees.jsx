import { useEffect, useState } from "react";
import Navbar from "../components/7-Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EmployeesPage() {
  const [employeeList, setEmployeeList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getEmployeeList");
        setEmployeeList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again later");
      }
    };

    fetchData();
  }, []);  
    
  
  return (
    <div className="flex">
      <Navbar />

      <div className="p-4 w-full">
        <h2 className="text-3xl mb-7">Employees</h2>

        <div>
          <Link to={'/employees/addEmployee'} className="bg-green-700 contrast-125 hover:bg-green-600 text-white p-4 rounded-md">Add New Employee</Link>
        </div>

        <div className="flex justify-center mt-6 w-full">
          <table>
            <thead>
              <tr>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-64">First Name</th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-64">Last Name</th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-64">Date Added</th>
              </tr>
          
            </thead>
            <tbody>
              {employeeList.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.firstName}</td>
                  <td className="text-center">{item.lastName}</td>
                  <td className="text-center">{item.dateTimeField.split('T')[0]}</td>

                </tr>


              ))}



            </tbody>
          </table>



        </div>





      </div>
    </div>
  );
}
