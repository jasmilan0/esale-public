import { Navigate, useParams } from "react-router-dom";
import Navbar from "../components/7-Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ItemEditPage() {
  const { skuID } = useParams();
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [cost, setCost] = useState(0.0);
  const [category, setCategory] = useState("");
  const [stockCount, setStockCount] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/getItemInfo", {
          params: { skuID: skuID },
        });
        data.map((item) => {
          setItemName(item.itemName);
          setPrice(parseFloat(item.price));
          setCost(parseFloat(item.cost));
          setCategory(item.category);
          setStockCount(item.stockCount);
        });
      } catch (error) {
        console.log("Error occured", error);
      }
    };

    fetchData();
  }, [skuID]);

  async function updateItem(ev) {
    ev.preventDefault();
    try {
      await axios.put("/updateItemInfo", {
        skuID,
        itemName,
        price,
        cost,
        category,
        stockCount,
      });
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteItem(ev) {
    ev.preventDefault();
    try {
      await axios.delete('/deleteItem', {
        params: { skuID: skuID },
      });
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }


  if(redirect){
   return <Navigate to={'/inventory'} />
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="w-full p-4">
        <h3 className="text-3xl mb-8">Update Item</h3>
        <Link
          to={"/inventory"}
          className="bg-green-700 contrast-125 hover:bg-green-600 text-white p-4 rounded-md"
        >
          {" "}
          Back{" "}
        </Link>
        <form onSubmit={updateItem} className="flex flex-col gap-2 mt-8">
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
            placeholder="Stock Count"
            value={stockCount}
            onChange={(ev) => setStockCount(ev.target.value)}
            required
          />

          <button className="text-center text-white bg-green-700 contrast-125 h-10 md:h-14 w-72 md:w-96 hover:bg-green-600 rounded-sm">
            Update Item
          </button>
        </form>

        <button onClick={deleteItem} className="mt-4 text-center text-white bg-green-700 contrast-125 h-10 md:h-14 w-72 md:w-96 hover:bg-green-600 rounded-sm">
          Delete Item
        </button>
      </div>
    </div>
  );
}
