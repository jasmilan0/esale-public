import axios from "axios";
import { useState } from "react";

export default function SalesReport() {
  const [date, setDate] = useState("");
  const [report, setReport] = useState({});
  

  async function salesReport(ev) {
    ev.preventDefault();
    try {
      const response = await axios.get("/getSalesReport", {
        params: { date: date },
      });
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-4">
          <form onSubmit={salesReport}>
            <input
              className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
              type="date"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
            />
            <button className="ml-4 text-white bg-green-700 contrast-125 px-4 py-3 rounded-md">
              {" "}
              Get Sale Report
            </button>
          </form>

          <div className="mt-4 grid grid-cols-2 place-items-center w-full">
            <div className="w-48 h-48 bg-gray-100">
              <h4 className="mt-4 text-xl text-center underline underline-offset-4">
                Orders
              </h4>
              <h5 className="text-lg text-center mt-10">{report.orderNum}</h5>
            </div>
            <div className="w-48 h-48 bg-gray-100">
              <h4 className="mt-4 text-xl text-center underline underline-offset-4">
                Sales
              </h4>
              <h5 className="text-lg text-center mt-10">
                ${parseFloat(report.total).toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
  );
}
