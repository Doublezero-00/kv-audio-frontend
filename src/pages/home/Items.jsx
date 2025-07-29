import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          console.log(res.data); // confirm structure: should be an array
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  return (
    <div className="w-full h-full flex flex-wrap justify-center pt-[50px]">
      {state === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      )}

      {state === "success" && items.length > 0 && (
        items.map((item) => (
          <ProductCard key={item._id || item.id || item.key} item={item} />
        ))
      )}

      {state === "success" && items.length === 0 && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      {state === "error" && (
        <p className="text-red-500 text-center mt-4">Failed to load products.</p>
      )}
    </div>
  );
}
