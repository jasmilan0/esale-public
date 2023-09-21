import { useParams } from "react-router-dom";
import Navbar from "../components/7-Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailedOrder() {
  const { orderID } = useParams();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/getSpecificOrder?orderID=${orderID}`);
      setOrderData(response.data);
    };

    fetchData();
  }, [orderID]);

  return (
    <div className="flex">
      <Navbar />
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10 mb-10">
        {/* Receipt header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Receipt</h1>
          <p className="text-gray-500">Order #{orderID.slice(-5)}</p>
        </div>

        {/* Receipt details */}
        <div className="mb-4">
          {orderData.map((order) => (
            order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.item.itemName}</span>
                <span>{item.count} x ${item.item.price}</span> {/* Replace with the actual item price */}
              </div>
            ))

          ))}

        </div>

        {/* Total */}
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            {orderData.map((order) => (
              <span key={order._id} className="font-semibold">${parseFloat(order.subTotal).toFixed(2)}</span>
            ))
             }
            
        
          </div>
        </div>

        {/* Payment information */}
        <div className="mb-6">
          <p className="text-sm">Payment method: Cash</p>
          <p className="text-sm">Order ID: {orderID}</p>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs">
          Thank you for your business!
        </div>
      </div>
    </div>
  );
}
