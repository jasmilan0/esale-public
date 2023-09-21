import { useState } from "react";
import Navbar from "../components/7-Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AddItemPage() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [cost, setCost] = useState(0.0);
  const [category, setCategory] = useState("");
  const [sku, setSKU] = useState("");
  const [stockCount, setStockCount] = useState(0);
  const [redirect, setRedirect] = useState(false);

  function submitNewItem(ev) {
    ev.preventDefault();
    axios
      .post("/addNewItem", {
        itemName,
        price,
        cost,
        category,
        sku,
        stockCount,
      })
      .then((response) => {
        if (response.status === 200) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("Duplicate SKU");
        } else if (error.response) {
          alert("Please try again later");
        }
      });
  }

  if (redirect) {
    return <Navigate to={"/inventory"} />;
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="w-full p-4">
        <h3 className="text-3xl mb-8">New Item</h3>
        <Link to={'/inventory'} className="bg-green-700 contrast-125 hover:bg-green-600 text-white p-4 rounded-md"> Back </Link>
        <form onSubmit={submitNewItem} className="flex flex-col gap-2 mt-8">
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(ev) => setItemName(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="number"
            step="0.01"
            placeholder="Cost"
            value={cost}
            onChange={(ev) => setCost(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="number"
            placeholder="SKU"
            value={sku}
            onChange={(ev) => setSKU(ev.target.value)}
            required
          />
          <input
            className="border border-black px-4 py-2 rounded-sm h-10 md:h-14 w-72 md:w-96"
            type="number"
            placeholder="Stock Count"
            value={stockCount}
            onChange={(ev) => setStockCount(ev.target.value)}
            required
          />

          <button className="text-center text-white bg-green-700 contrast-125 h-10 md:h-14 w-72 md:w-96 hover:bg-green-600 rounded-sm">
            Add New Item
          </button>
        </form>
      </div>
    </div>
  );
}
