import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";

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
        <div className="w-full h-screen flex justify-center items-center">

            {
                loadingStatus == "loading" && <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[20px] h-[70px] border-b-2 border-b-blue-500 animate-spin rounded-full"></div>
                </div>
            }
            {
                loadingStatus == "loaded" && <div className="w-full h-full mt-1 flex justify-center items-center">
                    <div className="w-[49%] h-full">
                        <ImageSlider images={product.image} />
                    </div>
                    <div className="w-[49%] h-full flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-blue-500">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-300">{product.category}</h2>
                        <p className="text-gray-700 mt-4">{product.description}</p>
                        <p className="text-lg font-bold text-green-500">{product.price}</p>
                    </div>
                </div>
            }
        </div>
    )
}