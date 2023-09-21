import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/7-Navbar";
import { useState } from "react";
import axios from "axios";

export default function PaymentPage() {
  const location = useLocation();
  const { orderData, subTotal } = location.state;
  const [paymentAmount, setPaymentAmount] = useState(0.0);
  const [paidCash, setPaidCash] = useState(false);
  const [continueButton, setContinueButton] = useState(false);

  function paymentAmountFunction(amount) {
    setPaymentAmount(amount);
  }

  function saveOrder() {
    axios.post("/saveOrder", {
      orderData,
      subTotal,
    });
    setContinueButton(true);
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="w-full flex">
        <div className="p-4 bg-slate-50 border-t-0 border-l-0 border-b-0 border-r-2 border-slate-100 w-1/3">
          <h3 className="text-center text-xl mb-3">Items to Purchase</h3>
          <div className="h-5/6 mt-3 flex flex-col justify-between">
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
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <h4>Subtotal</h4>
              <h4>${subTotal.toFixed(2)}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h4>Payment Received</h4>
              <h4>${paymentAmount}</h4>
            </div>
            {paidCash ? (
              <div className="flex justify-between items-center">
                <h4>Change Back</h4>
                <h4>${(paymentAmount - subTotal).toFixed(2)}</h4>
              </div>
            ) : (
              <div className="hidden">
                <h4>Change Back</h4>
                <h4>${subTotal.toFixed(2)}</h4>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 bg-white w-full h-screen">
          <h3 className="text-center text-xl mb-4">Payment</h3>
          <div className="flex flex-col h-5/6 justify-between">
            <div className="grid grid-rows-2 gap-3">
              <div className="grid grid-cols-4 gap-2">
                <div
                  onClick={() => paymentAmountFunction(subTotal)}
                  className="px-2 py-4 text-sm text-center border rounded-md border-black flex  justify-center items-center hover:shadow-lg active:shadow-2xl active:bg-gray-100"
                >
                  {subTotal.toFixed(2)}
                </div>
                <div
                  onClick={() => paymentAmountFunction(Math.ceil(subTotal))}
                  className="px-2 py-4 text-sm text-center border rounded-md border-black flex  justify-center items-center hover:shadow-lg active:shadow-2xl active:bg-gray-100"
                >
                  {Math.ceil(subTotal).toFixed(2)}
                </div>
                <div
                  onClick={() =>
                    paymentAmountFunction(Math.ceil(subTotal / 10) * 10)
                  }
                  className="px-2 py-4 text-sm text-center border rounded-md border-black flex  justify-center items-center hover:shadow-lg active:shadow-2xl active:bg-gray-100"
                >
                  {(Math.ceil(subTotal / 10) * 10).toFixed(2)}
                </div>
                <div
                  onClick={() =>
                    paymentAmountFunction(Math.ceil(subTotal / 10) * 10 + 10)
                  }
                  className="px-2 py-4 text-sm text-center border rounded-md border-black flex  justify-center items-center hover:shadow-lg active:shadow-2xl active:bg-gray-100"
                >
                  {(Math.ceil(subTotal / 10) * 10 + 10).toFixed(2)}
                </div>
              </div>
              <div>
                <div
                  onClick={() => {
                    setPaidCash(true);
                    saveOrder();
                  }}
                  className="px-2 py-4 text-sm text-center border rounded-md border-black flex  justify-center items-center hover:shadow-lg active:shadow-2xl active:bg-gray-100"
                >
                  Pay Cash
                </div>
              </div>
            </div>
            {continueButton ? (
              <Link
                to={"/terminal"}
                className="px-2 py-4 text-sm text-white text-center border rounded-md border-black flex  justify-center items-center hover:shadow-lg active:shadow-2xl bg-green-700 contrast-125"
              >
                Continue
              </Link>
            ) : (
              <div className="hidden px-2 py-4 text-sm text-white text-center border rounded-md border-black justify-center items-center hover:shadow-lg active:shadow-2xl bg-green-700 contrast-125">
                Continue
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
