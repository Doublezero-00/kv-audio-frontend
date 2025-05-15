import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, Routes, Route } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemsPage from "./addItemsPage";
import UpdateItemsPage from "./updateItemsPage";
import AdminUsersPage from "./adminUsersPage";
import AdminBookingPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminPage() {

  const[userValidated, setUserValidated] = useState(false);

  useEffect(()=>{

    const token = localStorage.getItem("token");
    if(!token){
      window.location.href = "/login";
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res)=>{
      console.log(res);
      const user = res.data;
      if(user.role != "admin"){
        window.location.href = "/";
      }
    }).catch((err)=>{
      console.error(err);
      setUserValidated(false);
    })
  })

  return (
    <div className="w-full h-screen flex">
      
      <div className="w-[200px] h-full bg-green-200">
        <Link
          to="/admin/dashboard"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <AiOutlineLineChart />
          Dashboard
        </Link>

        <Link
          to="/admin/booking"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegBookmark />
          Bookings
        </Link>

        <Link
          to="/admin/items"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <MdOutlineSpeaker />
          Items
        </Link>

        <Link
          to="/admin/users"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegUser />
          Users
        </Link>
      </div>

      <div className="w-[calc(100vw-200px)] h-full">
        <Routes path="/*">
          <Route path="/booking" element={<AdminBookingPage />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/items" element={<AdminItemsPage/>} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/items/add" element={<AddItemsPage/>} />
          <Route path="/items/edit" element={<UpdateItemsPage />} />
        </Routes>
      </div>
    </div>
  );
}
