import Navbar from "../components/7-Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RegCashPage() {
  const [inventoryData, setInventoryData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [paymentRedirect, setPaymentRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getInventoryData");
        setInventoryData(response.data);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again later");
      }
    };
    fetchData();
  }, []);

  function handleClick(item) {
    const existingItem = orderData.find(
      (orderItem) => orderItem.item._id === item._id
    );

    if (existingItem) {
      existingItem.count += 1;
      existingItem.totalCost = parseFloat(
        existingItem.count * existingItem.item.price
      ).toFixed(2);
      setOrderData([...orderData]);
    } else {
      const itemOrder = {
        item,
        count: 1,
        totalCost: item.price,
      };

      setOrderData([...orderData, itemOrder]);
    }
    //const newSubtotal = orderData.reduce(callbackfn)
  }

  const subTotal = orderData.reduce((acc, currentItem) => {
    return parseFloat(acc) + parseFloat(currentItem.totalCost);
  }, 0);

  function refreshPage() {
    window.location.reload(false);
  }

  function continueToPayment() {
    setPaymentRedirect(true);
  }

  if (paymentRedirect) {
    return (
      <Navigate to={"/terminal/payment"} state={{ orderData, subTotal }} />
    );
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="w-full flex">
        <div className="p-4 bg-slate-50 border-t-0 border-l-0 border-b-0 border-r-2 border-slate-100 w-1/3">
          <h3 className="text-center text-xl">Items to Purchase</h3>
          <div className="h-5/6 mt-3 mb-5 flex flex-col justify-between">
            <div>
              {orderData.map((itemData, index) => (
                <div key={index} className="flex justify-between">
                  <div className="flex gap-3">
                    <h6 className="text-sm">{itemData.item.itemName}</h6>
                    <h6 className="text-sm">x {itemData.count}</h6>
                  </div>
                  <h6 className="text-sm">${itemData.totalCost}</h6>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <h4>Subtotal</h4>
              <h4>${subTotal.toFixed(2)}</h4>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <button
              onClick={refreshPage}
              className="text-white bg-green-700 contrast-125 px-4 py-3 w-1/2 rounded-md"
            >
              New Order
            </button>
            <button
              onClick={continueToPayment}
              className="text-white bg-green-700 contrast-125 px-4 py-3 w-1/2 rounded-md"
            >
              Payment
            </button>
          </div>
        </div>
        <div className="p-4 bg-white w-full">
          <div className="grid grid-cols-3 auto-rows-auto gap-6">
            {inventoryData.map((item) => (
              <div
                key={item._id}
                onClick={() => handleClick(item)}
                className="bg-white w-60 p-4 border border-slate-400 rounded-sm hover:drop-shadow-xl active:drop-shadow-2xl"
              >
                <h4 className="text-xl">{item.itemName}</h4>
                <h6 className="text-xs mb-4">{item.sku}</h6>
                <h4 className="text-md">{item.price}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
