import { Link } from "react-router-dom";
import Navbar from "../components/7-Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryPage() {
  const [inventoryData, setInventoryData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [itemSearch, setItemSearch] = useState([]);

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

  async function searchInventory(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.get("/searchItem", {
        params: { searchValue },
      });
      setItemSearch(data);
    } catch (error) {
      alert("Error Searching for Item");
    }
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 w-full">
        <h2 className="text-3xl mb-7">Items</h2>

        <div className="flex justify-between">
          <Link
            to={"/inventory/addItem"}
            className="bg-green-700 contrast-125 hover:bg-green-600 text-white p-4 rounded-md"
          >
            Add Item
          </Link>

          <input
            className=" border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="Search by name or SKU"
            value={searchValue}
            onChange={(ev) => setSearchValue(ev.target.value)}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-7 top-24 cursor-pointer"
            onClick={searchInventory}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <div className="flex justify-center mt-4 w-full">
          <table>
            <thead>
              <tr>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-44">
                  SKU
                </th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-64">
                  Item Name
                </th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-32">
                  Price
                </th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-32">
                  Cost
                </th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-40">
                  Category
                </th>
                <th className=" bg-gray-200 border border-white border-t-0 border-l-0 border-b-0 border-r-2 w-52">
                  Stock Count
                </th>
              </tr>
            </thead>
            <tbody>
              {searchValue
                ? itemSearch.map((data) => (
                    <tr key={data._id}>
                      <td>
                        <Link
                          to={`/inventory/${data.sku}`}
                          className="flex justify-center text-green-700 contrast-125 hover:text-green-600 underline"
                        >
                          {data.sku}
                        </Link>
                      </td>
                      <td className="text-center">{data.itemName}</td>
                      <td className="text-center">{data.price}</td>
                      <td className="text-center">{data.cost}</td>
                      <td className="text-center">{data.category}</td>
                      <td className="text-center">{data.stockCount}</td>
                    </tr>
                  ))
                : inventoryData.map((data) => (
                    <tr key={data._id}>
                      <td>
                        <Link
                          to={`/inventory/${data.sku}`}
                          className="flex justify-center text-green-700 contrast-125 hover:text-green-600 underline"
                        >
                          {data.sku}
                        </Link>
                      </td>
                      <td className="text-center">{data.itemName}</td>
                      <td className="text-center">{data.price}</td>
                      <td className="text-center">{data.cost}</td>
                      <td className="text-center">{data.category}</td>
                      <td className="text-center">{data.stockCount}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
