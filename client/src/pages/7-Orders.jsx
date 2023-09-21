import { useEffect, useState } from "react";
import Navbar from "../components/7-Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getOrders");
        setOrders(response.data);
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
        <h2 className="text-3xl mb-7">Orders</h2>

        <div className="flex justify-center mt-4 w-full">
          <table>
            <thead>
              <tr>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-96">
                  Order Number
                </th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-96">
                  Order Date
                </th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-32">
                  Price Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orders ? (
                orders.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <Link to={`/orders/${item._id}`} className="text-green-700 contrast-125 hover:text-green-600 underline">{item._id}</Link>
                    </td>
                    <td className="text-center">{item.dateTimeField}</td>
                    <td className="text-center">${parseFloat(item.subTotal.$numberDecimal).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Create</td>
                  <td>New</td>
                  <td>Order</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
