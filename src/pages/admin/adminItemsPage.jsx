import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoPlusCircle } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const simpleArr = [];

export default function AdminItemsPage() {
  const [Items, setItem] = useState(simpleArr);
  const[itemsLoaded,setItemsLoaded] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {

    if(!itemsLoaded){
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`${backendUrl}/api/products`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setItem(res.data);
            setItemsLoaded(true);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to fetch products");
          });
      } else {
      toast.error("Please Login First");
      navigate("/login");
      }
    }
    
  }, [itemsLoaded]);

  const handleDelete = async (key) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios
          .delete(`${backendUrl}/api/products/${key}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            toast.success("Product Deleted Successfully");
            setItemsLoaded(false);
          })
          .catch((err) => {
            toast.error("Failed to Delete Product");
            console.error(err);
          });
      } else {
        toast.error("Please Login First");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full relative p-4 flex-col justify-center items-center">
      {!itemsLoaded &&<div className="border-4 border-white my-4 border-b-blue-500 bg-0 rounded-full animate-spin w-[100px] h-[100px]"></div>}
        <table className="w-[1050px] border border-collapse text-left shadow rounded overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border px-3 py-2">Key</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Dimensions</th>
              <th className="border px-3 py-2">Availability</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {Items.map((product) => (
            <tr key={product.key} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{product.key}</td>
              <td className="border px-3 py-2">{product.name}</td>
              <td className="border px-3 py-2">${product.price.toFixed(2)}</td>
              <td className="border px-3 py-2">{product.category}</td>
              <td className="border px-3 py-2">{product.dimensions}</td>
              <td className="border px-3 py-2">
                {product.availability ? "Available" : "Not Available"}
              </td>
              <td className="border px-3 py-2 flex flex-wrap gap-2">
                <button onClick={()=>{
                  navigate("/admin/items/edit", {state : product})
                }}>
                  <Link
                    to={`/admin/items/edit`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(product.key)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/admin/items/add">
        <GoPlusCircle className="text-[70px] text-blue-500 hover:text-red-900 absolute right-4 bottom-4 transition duration-200" />
      </Link>
    </div>
  );
}
