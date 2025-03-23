import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, Routes, Route } from "react-router-dom";
export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      
      <div className="w-[300px] h-full bg-green-200">
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

      <div className="w-[calc(100vw-300px)] h-full bg-amber-300">
        <Routes path="/*">
          <Route path="/bookings" element={<h1>Bookings</h1>} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/items" element={<h1>Items</h1>} />
          <Route path="/users" element={<h1>Users</h1>} />
        </Routes>
      </div>
    </div>
  );
}
