import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemsPage from "./addItemsPage";
import UpdateItemsPage from "./updateItemsPage";
import AdminUsersPage from "./adminUsersPage";
import AdminBookingPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./adminDashboard";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const user = res.data;
        if (user.role !== "admin") {
          window.location.href = "/";
        } else {
          setUserValidated(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setUserValidated(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-blue-500 text-white flex flex-col shadow-lg">
        <div className="h-16 flex items-center justify-center text-xl font-bold tracking-wide border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-lg font-medium ${
              location.pathname === "/admin/dashboard"
                ? "bg-blue-500 text-white"
                : "hover:bg-white hover:text-white"
            }`}
          >
            <AiOutlineLineChart className="text-xl" />
            Dashboard
          </Link>

          <Link
            to="/admin/booking"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-lg font-medium ${
              location.pathname === "/admin/booking"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            <FaRegBookmark className="text-xl" />
            Bookings
          </Link>

          <Link
            to="/admin/items"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-lg font-medium ${
              location.pathname === "/admin/items"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            <MdOutlineSpeaker className="text-xl" />
            Items
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-lg font-medium ${
              location.pathname === "/admin/users"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            <FaRegUser className="text-xl" />
            Users
          </Link>
        </nav>
      </div>

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="p-6">
          <Routes>
            <Route path="/booking" element={<AdminBookingPage />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items/add" element={<AddItemsPage />} />
            <Route path="/items/edit" element={<UpdateItemsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
