import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Items(){

    const [state,setState] = useState("loading");//loading, success, error
    const [items,setItems] = useState([]);

    useEffect(()=>{
        if(state == "loading"){
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`).then((res)=>{
                setItems(res.data);
                setState("success");
            }).catch((err)=>{
                toast.error("An error occured while fetching items");
                setState("error");
            })
        }
    },[])

    return(
        <div className="w-full h-screen flex flex-wrap pt-[50px]">
            
        </div>
    );
}