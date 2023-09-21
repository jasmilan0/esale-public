import "./App.css";
//import Layout from './Layout'
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/1-HomePage";
import LoginPage from "./pages/3-LoginPage";
import RegisterPage from "./pages/2-RegisterPage";
import RegCashPage from "./pages/5-RegCashPage";
import ReportingPage from "./pages/6-ReportingPage";
import OrdersPage from "./pages/7-Orders";
import InventoryPage from "./pages/9-Inventory";
import EmployeesPage from "./pages/11-Employees";
import AccountPage from "./pages/12-AccountPage";
import AddItemPage from "./pages/9a - AddItemPage";
import ItemEditPage from "./pages/9b-ItemEditPage";
import PaymentPage from "./pages/5a-PaymentPage";
import DetailedOrder from "./pages/7a-DetailedOrder";
import AddEmployee from "./pages/11a - AddEmployee";
import SignOut from "./pages/13-Signout";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/terminal" element={<RegCashPage />} />
      <Route path="/terminal/payment" element={<PaymentPage />} />
      <Route path="/reporting/:subpage?" element={<ReportingPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:orderID" element={<DetailedOrder />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/addItem" element={<AddItemPage />} />
      <Route path="/inventory/:skuID" element={<ItemEditPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/employees/addEmployee" element={<AddEmployee />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/signout" element={<SignOut />} />
    </Routes>
  );
}

export default App;
