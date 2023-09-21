import axios from "axios";
import { useState } from "react";

export default function InventoryReport() {
  const [date, setDate] = useState("");
  const [report, setReport] = useState([]);
  

  async function getInventoryReport(ev) {
    ev.preventDefault();
    try {
      const response = await axios.get("/getInventoryReport", {
        params: { date: date },
      });
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-4">
      <form onSubmit={getInventoryReport}>
        <input
          className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
          type="date"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
        />
        <button className="ml-4 text-white bg-green-700 contrast-125 px-4 py-3 rounded-md">
          Get Inventory Report
        </button>
      </form>

      <div className="flex justify-center mt-4 w-full">
        <table>
          <thead>
            <tr>
              <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-64">
                Item Id
              </th>
              <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-44">
                SKU
              </th>
              <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-44">
                Item Name
              </th>
              <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-44">
                Count
              </th>
            </tr>
          </thead>

          <tbody>
            {report.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.itemId}</td>
                <td className="text-center">{item.sku}</td>
                <td className="text-center">{item.itemName}</td>
                <td className="text-center">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
