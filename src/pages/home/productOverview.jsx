import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const params = useParams();
    console.log(params);
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`).then((res)=>{
            setProduct(res.data);
            setLoadingStatus("loaded");
        }).catch((err)=>{
            console.error(err);
            setLoadingStatus("error");
        })
    },[])

    return(
        <div className="w-full flex justify-center">

            {
                loadingStatus == "loading" && <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[20px] h-[70px] border-b-2 border-b-blue-500 animate-spin rounded-full"></div>
                </div>
            }
            {
                loadingStatus == "loaded" && <div className="w-full h-full mb-5 flex flex-col justify-center items-center">
                    <h1 className="text-3xl my-2 md:hidden font-bold text-blue-500">{product.name}</h1>
                    <div className="w-[49%] h-full">
                        <ImageSlider images={product.image} />
                    </div>
                    <div className="w-[49%] h-full flex flex-col items-center">
                        
                        <h2 className="text-xl font-semibold text-gray-300">{product.category}</h2>
                        <p className="text-gray-700 mt-4">{product.description}</p>
                        <p className="text-lg font-bold text-green-500">{product.price}</p>
                        <p className="text-gray-500 mt-4">{product.dimension}</p>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer" onClick={()=>{
                            addToCart(product.key,1);
                            toast.success("Added to cart successfully");
                        }}>
                            Add to Cart</button>
                    </div>
                </div>
            }
        </div>
    )
}