import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateItemsPage() {

    const location = useLocation();
    console.log(location);

    const [productKey, setProductKey] = useState(location.state.key);
    const [productName, setProductName] = useState(location.state.name);
    const [productPrice, setProductPrice] = useState(location.state.price);
    const [productCategory, setProductCategory] = useState(location.state.category);
    const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
    const [productDescription, setProductDescription] = useState(location.state.description);
    const navigate = useNavigate();

    async function handleAddItems(){
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        
        if(token){
            try {
                const result = await axios.put(`${backendUrl}/api/products/`+productKey, {
                    key : productKey,
                    name : productName,
                    price : productPrice,
                    category : productCategory,
                    dimensions : productDimensions,
                    description : productDescription
                }, {
                    headers : {
                        Authorization : "Bearer " + token
                    }
                });

                console.log(result);
                toast.success(result.data.message);
                navigate("/admin/items");

            } catch (error) {
                console.error(error);
                toast.error(result.data.message);
            }
        } else {
            toast.error("Please login first");
            navigate("/login");
        }
    }

    return (
        <div className="w-full h-full p-6 bg-gray-100">
            <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Item</h1>

                <div className="flex flex-col gap-4">
                    <input
                        disabled
                        type="text" 
                        onChange={(e) => setProductKey(e.target.value)} 
                        value={productKey} 
                        placeholder="Product Key" 
                        className="p-3 border rounded-md"
                    />
                    <input 
                        type="text" 
                        onChange={(e) => setProductName(e.target.value)} 
                        value={productName}
                        placeholder="Product Name" 
                        className="p-3 border rounded-md"
                    />
                    <input 
                        type="number" 
                        onChange={(e) => setProductPrice(Number(e.target.value))} 
                        value={productPrice}
                        placeholder="Product Price" 
                        className="p-3 border rounded-md"
                    />
                    <select 
                        onChange={(e) => setProductCategory(e.target.value)} 
                        value={productCategory} 
                        className="p-3 border rounded-md"
                    >
                        <option value="Audio">Audio</option>
                        <option value="Lights">Lights</option>
                    </select>
                    <input 
                        type="text" 
                        onChange={(e) => setProductDimensions(e.target.value)} 
                        value={productDimensions}
                        placeholder="Product Dimensions" 
                        className="p-3 border rounded-md"
                    />
                    <textarea 
                        type="text" 
                        onChange={(e) => setProductDescription(e.target.value)} 
                        value={productDescription}
                        placeholder="Product Description" 
                        className="p-3 border rounded-md"
                    />

                    <div className="flex justify-between gap-4">
                        <button onClick={handleAddItems} 
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                        >
                            Update Item
                        </button>
                        <button onClick={()=>{navigate("/admin/items")}}
                            className="w-full bg-gray-300 text-black py-3 rounded-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
