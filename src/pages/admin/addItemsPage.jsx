import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";


export default function AddItemsPage() {

    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productCategory, setProductCategory] = useState("Audio");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImages, setProductImages] = useState([]);

    const navigate = useNavigate();

    async function handleAddItems(){

        const promises = [];

        for(let i=0; i<productImages.length; i++){
            console.log(productImages[i]);
            const promise = mediaUpload(productImages[i]);
            promises.push(promise);
        }

        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        
        if(token){
            try {

                const imageUrls = await Promise.all(promises);

                const result = await axios.post(`${backendUrl}/api/products`, {
                    key : productKey,
                    name : productName,
                    price : productPrice,
                    category : productCategory,
                    dimensions : productDimensions,
                    description : productDescription,
                    image : imageUrls
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
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Item</h1>

                <div className="flex flex-col gap-4">
                    <input 
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

                    <input type="file" multiple onChange={(e)=>{setProductImages(e.target.files)}} className="w-full p-2 border rounded"/>

                    <div className="flex justify-between gap-4">
                        <button onClick={handleAddItems} 
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                        >
                            Add Item
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
