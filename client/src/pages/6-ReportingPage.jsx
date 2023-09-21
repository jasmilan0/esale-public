import Navbar from "../components/7-Navbar";
import "../stylesheets/1-header.css";
import { Link, useParams } from "react-router-dom";
import SalesReport from "./6a-SalesReport";
import InventoryReport from "./6b-InventoryReport";

export default function ReportingPage() {
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "sales-report";
  }

  function linkClasses(type = null) {
    let classes = "classy-button-animation font-Rajdhani px-4 py-3";

    if (type === subpage) {
      classes += " text-white bg-green-700 contrast-125 rounded-md";
    }

    return classes;
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 w-full">
        <h2 className="text-3xl mb-7">Reports</h2>

        <div className=" flex gap-4 justify-center">
          <Link className={linkClasses("sales-report")} to={"/reporting"}>
            Sales Report
          </Link>
          <Link
            className={linkClasses("inventory-report")}
            to={"/reporting/inventory-report"}
          >
            Inventory Report
          </Link>
        </div>

        {subpage === "sales-report" && <SalesReport />}

        {subpage === "inventory-report" && <InventoryReport />}
      </div>
    </div>
  );
}
